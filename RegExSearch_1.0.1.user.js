// ==UserScript==
// @name           RegEx Search
// @version        1.0.1
// @author         Mariotti94
// @namespace      regexSearch
// @run-at         document-end
// @include        http://*/*
// @include        https://*/*
// @include        file://*/*
// ==/UserScript==

var searchMain = document.createElement('div');
searchMain.id = 'searchMain';
document.body.appendChild(searchMain);

var searchToggle = document.createElement('span');
searchToggle.id = 'searchToggle';
searchToggle.textContent = 'Search';
searchToggle.setAttribute( 'onclick' , 'toggleDiv();' );
searchMain.appendChild(searchToggle);

var searchDiv = document.createElement('div');
searchDiv.id = 'searchDiv';
searchDiv.style.cssText = "display: none;";
searchMain.appendChild(searchDiv);

var searchStart = document.createElement('span');
searchStart.id = 'searchStart';
searchStart.textContent = 'start';
searchStart.setAttribute( 'onclick' , 'resetColor(); findAndColor(); selectElement(true);' );
searchDiv.appendChild(searchStart);

var searchPrev = document.createElement('span');
searchPrev.id = 'searchPrev';
searchPrev.textContent = 'prev';
searchPrev.setAttribute( 'onclick' , 'selectElement(false);' );
searchDiv.appendChild(searchPrev);

var searchNext = document.createElement('span');
searchNext.id = 'searchNext';
searchNext.textContent = 'next';
searchNext.setAttribute( 'onclick' , 'selectElement(true);' );
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
css.innerHTML += "#searchMain { all:unset; color:black; position:fixed; z-index:2147483647; bottom:0px; left:0px;  font-size: 14px; line-height:16px; } ";
css.innerHTML += "#searchToggle {  all:unset; float:left; user-select:none; cursor:pointer; background: #ffffff; padding:5px;  font-weight: bold; border: 1px solid; } ";
css.innerHTML += "#searchDiv { all:unset; float:left; } ";
css.innerHTML += "#searchStart { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchPrev { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchNext { all:unset; float:left; user-select:none; cursor:pointer; background-color:white; padding:5px; font-weight: bold; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchAmount { all:unset; float:left; display:none; user-select:none; cursor:pointer; background-color:white; padding:5px; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchInput { all:unset; float:left; background-color:white; padding: 5px; max-width: 100%; width: 300px; border: 1px solid; margin-left: -1px; } ";
css.innerHTML += "#searchInput:focus { outline: none; } ";
css.innerHTML += "#searchSpan { all:unset; float:left; display:none; padding: 5px; background-color:white; color:red; border: 1px solid black; margin-left: -1px; } ";
document.body.appendChild(css);


toggleDiv = function() {
    var searchDiv = document.getElementById('searchDiv');
    if(searchDiv.style.display == 'none')
        searchDiv.style.display = 'block';
    else
        searchDiv.style.display = 'none';
};

resetColor = function() {
    selectedElement = 0;
    var amount = document.querySelector('#searchAmount');
    amount.style.display = 'none';
    var em = document.querySelectorAll('em[class^="highlighted"]');
    if( !em.length )
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
    if( !em.length )
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
    var replacement = "<em class='highlighted'>$1</em>";
    findAndReplace("("+input+")",replacement,false);
};

findAndReplace = function(searchText, replacement, searchNode) {
    if ( searchText == "()") {
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
