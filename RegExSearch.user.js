// ==UserScript==
// @name           RegEx Search
// @version        1.0.7
// @author         Mariotti94
// @namespace      regexSearch
// @description    RegEx Search is a script that adds a regular expression search tool to pages.
// @match          *://*/*
// @grant          GM.setClipboard
// @run-at         document-end
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcQAAAHECAYAAACnX1ofAAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nO3deZhcdZn28fs5Vb0mZGEP2SCKLLIICILKCCqCDo4O0FFIujrpLQoGCaSrAyqWjq9Jd4c1bL0mXZ0AJo7vjL7jMg6OjvugjsiIghqQTQQSSEK6O+mu87x/pJkRyVLVXec8dX7n/lyXf4yXpr5jSN85p84CEBEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREVn6S6W79tHUET4GlOVLYDgEKHAdkK1S0K2QrBloTKc14CTyZHtj7VtaRrxDqX9i7Vm/48fDnHuiNMmvC/MFDf8T3rjihI9aSvhMrfW3eESaF3DzS1fyXMz5RUT1rD/EAykwPwrABPKPBbiD7s+YmHE7LrV72Nt2y1jou7RWtbjvRHvZ9BdKZ1S4ieSApO6Wto32EdUspSPStOA/yfACi3bgmLAN8enPL4+zfN35QL9XM5iATgKQF+qKI/giZ+MDTlD78K+x9EAhZ1p8/2Bd8FUGHdEhYVdA00tC+x7ihVi9ZmKv3c4IMATrJuCdFjo7u9s++9ctVLYX8wB5H2Zgeg3xGVr48CX9/Q1P60dVBcpHrSdQDWWXeESCHyt9mGtm9Yh5Siut6WO1TlKuuOEO0QX87pb277tcWHcxApHw8J5J9zoveub2h/1DrGdbW96U5RNFt3hOjZ0d3eSRZHBKWsrrflfaryTQBi3RISXyEfHmhs+5pVQNLqgylSTlXoqZ7ixlRP+ucQuTcJvb+vof1Z6zAXVY2+/IldiWknKHCudUtIjior15sBLLYOKRWXd153qKqsQ3zGEBD9zEBDu9kYAoBn+eEUSWdA9aZRxVOp3vTXUn3L3wuN0R/aEHQt6RqRhM6HyjPWLWFR6KJU7/JYXUW5P+WJ5F0AZlh3hOgr2fqOldYRPGVKxfBrQNZMHRxct+bqNbusY1wRu4tsBM8nJHHS2vqVL1inWKrtTTeIose6I0QPabn/joHU6p3WITxCpGJ4M6D3bJtU9WSqO51ZsH7pFOsgF6xrav8JIJ+07giN4vCc5m6zzrBU37dinihu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
// ==/UserScript==

//global object
window.regexSearch = {};

//config
window.regexSearch.searchTopBottom = true; //alignment: false == Top, true == Bottom
window.regexSearch.searchTopBottomPx = 0; //margin Top/Bottom
window.regexSearch.searchLeftPx = 0; //margin Left

window.regexSearch.activeExpFile = true; //toggle for export to txt
window.regexSearch.activeExpClip = true; //toggle for export to clipboard

window.regexSearch.saveLastQuery = true; //save query in browser memory

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

if (window.regexSearch.activeExpFile) {
    var searchExpFile = document.createElement('span');
    searchExpFile.id = 'searchExpFile';
    searchExpFile.textContent = 'export';
    searchDiv.appendChild(searchExpFile);
}

if (window.regexSearch.activeExpClip) {
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
let positioning =((window.regexSearch.searchTopBottom) ? "bottom: "+window.regexSearch.searchTopBottomPx+"px; " : "top: "+window.regexSearch.searchTopBottomPx+"px; ")+"left: "+window.regexSearch.searchLeftPx+"px;";
css.innerHTML += "#searchMain { all:unset; color:black; position:fixed; z-index:2147483647; "+positioning+" font-size: 14px; line-height:16px; } ";
css.innerHTML += "#searchToggle {  all:unset; float:left; user-select:none; cursor:pointer; background: #ffffff; padding:5px;  font-weight: bold; border: 1px solid; } ";
css.innerHTML += "#searchDiv { all:unset; float:left; } ";
if (window.regexSearch.activeExpFile) {
    css.innerHTML += "#searchExpFile { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; display: none; } ";
}
if (window.regexSearch.activeExpClip) {
    css.innerHTML += "#searchExpClip { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; display: none; } ";
}
css.innerHTML += "#searchStart { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchPrev { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchNext { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchAmount { all:unset; float:left; display:none; user-select:none; cursor:pointer; background-color:white; padding:5px; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchInput { all:unset; float:left; background-color:white; padding: 5px; max-width: 100%; width: 300px; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchInput:focus { outline: none; } ";
css.innerHTML += "#searchSpan { all:unset; float:left; display:none; padding: 5px; background-color:white; color:red; border: 1px solid black; margin-left: -1px; } ";
document.body.appendChild(css);

//functions
window.regexSearch.toggleDiv = function() {
    var searchDiv = document.getElementById('searchDiv');
    if (searchDiv.style.display == 'none') {
        searchDiv.style.display = 'block';
    }
    else {
        searchDiv.style.display = 'none';
    }
};

window.regexSearch.resetColor = function() {
    window.regexSearch.selectedElement = 0;
    var em = document.querySelectorAll('em[class^="highlighted"]');
    if (!em.length) {
        return;
    }
    for(var i=0; i<em.length; i++) {
        var parent = em[i].parentNode;
        if (em[i].firstChild) {
            parent.insertBefore( em[i].firstChild, em[i] );
        }
        parent.removeChild( em[i] );
        parent.normalize();
    }
};

window.regexSearch.selectedElement = 0;
window.regexSearch.selectElement = function(forward) {
    var em = document.querySelectorAll('em[class^="highlighted"]');
    var amount = document.querySelector('#searchAmount');
    if (!em.length) {
        amount.style.display = 'inline';
        amount.textContent = '0/0'
        return;
    }
    var previousElement = window.regexSearch.selectedElement;
    if (forward) {
        window.regexSearch.selectedElement++;
    }
    else {
        window.regexSearch.selectedElement--;
    }
    if (window.regexSearch.selectedElement<1) {
        window.regexSearch.selectedElement = em.length;
    }
    if (window.regexSearch.selectedElement>em.length) {
        window.regexSearch.selectedElement = 1;
    }
    if (previousElement) {
        em[previousElement-1].removeAttribute('style');
    }
    em[window.regexSearch.selectedElement-1].style.backgroundColor = 'orange';
    em[window.regexSearch.selectedElement-1].scrollIntoView({block: "center"});
    amount.style.display = 'inline';
    amount.textContent = window.regexSearch.selectedElement + "/" + em.length;
};

window.regexSearch.findAndColor = function() {
    var warning = document.getElementById('searchSpan');
    warning.innerHTML = '';
    warning.style.display = 'none';
    var input = document.getElementById('searchInput').value;
    if (window.regexSearch.saveLastQuery) {
        localStorage.setItem('regexSearch_query', input);
    }
    var replacement = "<em class='highlighted'>$1</em>";
    window.regexSearch.findAndReplace("("+input+")", replacement, false);
};

window.regexSearch.findAndReplace = function(searchText, replacement, searchNode) {
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

window.regexSearch.saveData = (function () {
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
window.regexSearch.exportData = function(toTxt) {
    var em = document.querySelectorAll('em[class^="highlighted"]');
    if (!em.length) {
        return;
    }
    let text = "";
    for(var i=0; i<em.length; i++) {
        text += em[i].textContent;
        text += "\r\n";
    }
    var now = new Date();
    var stamp = "-"+now.getFullYear().toString()+("00" + (now.getMonth()+1).toString()).slice(-2)+("00" + now.getDate().toString()).slice(-2)+"-"+("00" + now.getHours().toString()).slice(-2)+("00" + now.getMinutes().toString()).slice(-2)+("00" + now.getSeconds().toString()).slice(-2);
    if (toTxt) {
        window.regexSearch.saveData(text, "dump"+stamp+".txt");
    }
    else {
        GM.setClipboard(text);
    }
};

//CSP workaround
function searchToggleFn() {
    window.regexSearch.toggleDiv();
    if (window.regexSearch.saveLastQuery) {
        let temp = localStorage.getItem('regexSearch_query');
        if (temp) {
            document.getElementById('searchInput').value = temp;
        }
    }
    else {
        localStorage.removeItem('regexSearch_query');
    }
}
function searchStartFn() {
    document.querySelector('#searchAmount').style.display = 'none';
    if (window.regexSearch.activeExpFile) {
        document.querySelector('#searchExpFile').style.display = 'none';
    }
    if (window.regexSearch.activeExpClip) {
        document.querySelector('#searchExpClip').style.display = 'none';
    }
    window.regexSearch.resetColor();
    window.regexSearch.findAndColor();
    window.regexSearch.selectElement(true);
    if (window.regexSearch.activeExpFile && document.querySelectorAll('em[class^="highlighted"]').length) {
        document.getElementById('searchExpFile').style.display = 'inline';
    }
    if (window.regexSearch.activeExpClip && document.querySelectorAll('em[class^="highlighted"]').length) {
        document.getElementById('searchExpClip').style.display = 'inline';
    }
}
function searchPrevFn() {
    window.regexSearch.selectElement(false);
}
function searchNextFn() {
    window.regexSearch.selectElement(true);
}
function searchExpFileFn() {
    window.regexSearch.exportData(true);
}
function searchExpClipFn() {
    window.regexSearch.exportData(false);
}

document.getElementById('searchToggle').addEventListener('click', searchToggleFn);
document.getElementById('searchStart').addEventListener('click', searchStartFn);
document.getElementById('searchPrev').addEventListener('click', searchPrevFn);
document.getElementById('searchNext').addEventListener('click', searchNextFn);
if (window.regexSearch.activeExpFile) {
    document.getElementById('searchExpFile').addEventListener('click', searchExpFileFn);
}
if (window.regexSearch.activeExpClip) {
    document.getElementById('searchExpClip').addEventListener('click', searchExpClipFn);
}
