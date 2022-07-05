// ==UserScript==
// @name           RegEx Search
// @version        1.0.5
// @author         Mariotti94
// @namespace      regexSearch
// @run-at         document-end
// @match          *://*/*
// @grant          GM.setClipboard
// ==/UserScript==

//config
searchTopBottom = true; //alignment: false == Top, true == Bottom
searchTopBottomPx = 0; //margin Top/Bottom
searchLeftPx = 0; //margin Left

activeExpFile = true; //toggle for export to txt
activeExpClip = true; //toggle for export to clipboard

saveLastQuery = true; //save query in browser memory

//elements
var searchMain = document.createElement('div');
searchMain.id = 'searchMain';
document.body.appendChild(searchMain);

var searchToggle = document.createElement('span');
searchToggle.id = 'searchToggle';
searchToggle.textContent = 'Search';
searchMain.appendChild(searchToggle);

var searchDiv = document.createElement('div');
searchDiv.id = 'searchDiv';
searchDiv.style.cssText = "display: none;";
searchMain.appendChild(searchDiv);

if(activeExpFile) {
    var searchExpFile = document.createElement('span');
    searchExpFile.id = 'searchExpFile';
    searchExpFile.textContent = 'export';
    searchDiv.appendChild(searchExpFile);
}

if(activeExpClip) {
    var searchExpClip = document.createElement('span');
    searchExpClip.id = 'searchExpClip';
    searchExpClip.textContent = 'copy all';
    searchDiv.appendChild(searchExpClip);
}

var searchStart = document.createElement('span');
searchStart.id = 'searchStart';
searchStart.textContent = 'start';
searchDiv.appendChild(searchStart);

var searchPrev = document.createElement('span');
searchPrev.id = 'searchPrev';
searchPrev.textContent = 'prev';
searchDiv.appendChild(searchPrev);

var searchNext = document.createElement('span');
searchNext.id = 'searchNext';
searchNext.textContent = 'next';
searchDiv.appendChild(searchNext);

var searchAmount = document.createElement('span');
searchAmount.id = 'searchAmount';
searchDiv.appendChild(searchAmount);

var searchInput = document.createElement('input');
searchInput.id = 'searchInput';
searchDiv.appendChild(searchInput);

var searchSpan = document.createElement('span');
searchSpan.id = 'searchSpan';
searchDiv.appendChild(searchSpan);

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".highlighted { background-color:yellow; } ";
let positioning =((searchTopBottom) ? "bottom: "+searchTopBottomPx+"px; " : "top: "+searchTopBottomPx+"px; ")+"left: "+searchLeftPx+"px;";
css.innerHTML += "#searchMain { all:unset; color:black; position:fixed; z-index:2147483647; "+positioning+" font-size: 14px; line-height:16px; } ";
css.innerHTML += "#searchToggle {  all:unset; float:left; user-select:none; cursor:pointer; background: #ffffff; padding:5px;  font-weight: bold; border: 1px solid; } ";
css.innerHTML += "#searchDiv { all:unset; float:left; } ";
if(activeExpFile)
    css.innerHTML += "#searchExpFile { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; display: none; } ";
if(activeExpClip)
    css.innerHTML += "#searchExpClip { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; display: none; } ";
css.innerHTML += "#searchStart { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchPrev { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchNext { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchAmount { all:unset; float:left; display:none; user-select:none; cursor:pointer; background-color:white; padding:5px; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchInput { all:unset; float:left; background-color:white; padding: 5px; max-width: 100%; width: 300px; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchInput:focus { outline: none; } ";
css.innerHTML += "#searchSpan { all:unset; float:left; display:none; padding: 5px; background-color:white; color:red; border: 1px solid black; margin-left: -1px; } ";
document.body.appendChild(css);

//globals
toggleDiv = function() {
    var searchDiv = document.getElementById('searchDiv');
    if(searchDiv.style.display == 'none')
        searchDiv.style.display = 'block';
    else
        searchDiv.style.display = 'none';
};

resetColor = function() {
    selectedElement = 0;
    var em = document.querySelectorAll('em[class^="highlighted"]');
    if(!em.length)
        return;
    for(var i=0; i<em.length; i++) {
        var parent = em[i].parentNode;
        if(em[i].firstChild)
            parent.insertBefore( em[i].firstChild, em[i] );
        parent.removeChild( em[i] );
        parent.normalize();
    }
};

selectedElement = 0;
selectElement = function(forward) {
    var em = document.querySelectorAll('em[class^="highlighted"]');
    if(!em.length)
        return;
    var previousElement = selectedElement;
    if(forward)
        selectedElement++;
    else
        selectedElement--;
    if(selectedElement<1)
        selectedElement = em.length;
    if(selectedElement>em.length)
        selectedElement = 1;
    if(previousElement)
        em[previousElement-1].removeAttribute('style');
    em[selectedElement-1].style.backgroundColor = 'orange';
    em[selectedElement-1].scrollIntoView({block: "center"});
    var amount = document.querySelector('#searchAmount');
    amount.style.display = 'inline';
    amount.textContent = selectedElement + "/" + em.length;
};

findAndColor = function() {
    var warning = document.getElementById('searchSpan');
    warning.innerHTML = '';
    warning.style.display = 'none';
    var input = document.getElementById('searchInput').value;
    if(saveLastQuery)
        localStorage.setItem('regexSearch_query', input);
    var replacement = "<em class='highlighted'>$1</em>";
    findAndReplace("("+input+")", replacement, false);
};

findAndReplace = function(searchText, replacement, searchNode) {
    if (searchText == "()") {
        return;
    }
    var regex;
    try {
		regex = RegExp(searchText, 'gi');
	} catch(e) {
        var warning = document.getElementById('searchSpan');
		warning.innerHTML = 'INVALID REGEX';
		warning.style.display = 'inline';
		return;
	}
    var childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length;
        //,excludes = 'html,head,style,title,link,script,object,iframe,noscript';//'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 && (currentNode.offsetHeight!= 0 || currentNode.offsetWidth!= 0) &&
            currentNode.id != 'searchToggle' && currentNode.id != 'searchDiv'
            //&& (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1
            ) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data)) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function() {
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
};

saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var blob = new Blob([data], {type: "octet/stream"});
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.parentNode.removeChild(a);
    };
}());
exportData = function(toTxt) {
    var em = document.querySelectorAll('em[class^="highlighted"]');
    if(!em.length)
        return;
    let text = "";
    for(var i=0; i<em.length; i++) {
        text += em[i].textContent;
        text += "\r\n";
    }
    var now = new Date();
    var stamp = "-"+now.getFullYear().toString()+("00" + (now.getMonth()+1).toString()).slice(-2)+("00" + now.getDate().toString()).slice(-2)+"-"+("00" + now.getHours().toString()).slice(-2)+("00" + now.getMinutes().toString()).slice(-2)+("00" + now.getSeconds().toString()).slice(-2);
    if(toTxt)
        saveData(text, "dump"+stamp+".txt");
    else
        GM.setClipboard(text);
};

//CSP workaround
function searchToggleFn(){
    toggleDiv();
    if(saveLastQuery) {
        let temp = localStorage.getItem('regexSearch_query');
        if(temp)
            document.getElementById('searchInput').value = temp;
    }
    else
        localStorage.removeItem('regexSearch_query');
}
function searchStartFn(){
    document.querySelector('#searchAmount').style.display = 'none';
    if(activeExpFile)
        document.querySelector('#searchExpFile').style.display = 'none';
    if(activeExpClip)
        document.querySelector('#searchExpClip').style.display = 'none';
    resetColor();
    findAndColor();
    selectElement(true);
    if(activeExpFile && document.querySelectorAll('em[class^="highlighted"]').length)
        document.getElementById('searchExpFile').style.display = 'inline';
    if(activeExpClip && document.querySelectorAll('em[class^="highlighted"]').length)
        document.getElementById('searchExpClip').style.display = 'inline';
}
function searchPrevFn(){
    selectElement(false);
}
function searchNextFn(){
    selectElement(true);
}
function searchExpFileFn(){
    exportData(true);
}
function searchExpClipFn(){
    exportData(false);
}

document.getElementById('searchToggle').addEventListener('click', searchToggleFn);
document.getElementById('searchStart').addEventListener('click', searchStartFn);
document.getElementById('searchPrev').addEventListener('click', searchPrevFn);
document.getElementById('searchNext').addEventListener('click', searchNextFn);
if(activeExpFile)
    document.getElementById('searchExpFile').addEventListener('click', searchExpFileFn);
if(activeExpClip)
    document.getElementById('searchExpClip').addEventListener('click', searchExpClipFn);
