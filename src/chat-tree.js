function ChatTree(element) {

    let generalItems = [];
    let chosenLi = null;

    // function getEventTarget(e) {
    //     e = e || window.event;
    //     return e.target || e.srcElement;
    // }
    //
    // element.onclick = function(event) {
    //     let target = getEventTarget(event);
    //     alert(target.innerHTML + element.indexOf(target));
    // };

    function load(items) {
        generalItems = items;
        clear();
        addLine(element, items, false);
    }

    function clear() {
        element.innerHTML = "";
    }

    function addLine(main, items, parent) {
        if (main === element.lastElementChild){
            parent= true;
        }
        let positionIndexElement=main;
        let parentPath = main.getAttribute("path");
        parentPath = (parentPath===null)? "": parentPath+",";

        if(items.length>0){
            let pad = main.getAttribute("tabindex");
            for(let entry of items){
                let li = document.createElement("li");
                let img = document.createElement("img");
                img.setAttribute("src", "pics/user3D.png");
                li.appendChild(img);
                li.setAttribute("tabindex",""+ (Number(pad)+1));
                li.setAttribute("dataType", entry.type);
                li.setAttribute("path", parentPath+items.indexOf(entry));
                li.setAttribute("style", "padding-left:"+ Number(pad)*10+"px");
                li.appendChild(document.createTextNode(entry.name));
                li.addEventListener('click', ()=>{
                    toggleClass(li);
                }, false);
                if(entry.type==="group"){
                    img.setAttribute("src", "pics/group3D.png");
                    li.classList.add("type-group");
                    li.setAttribute("status", "close");
                    li.addEventListener('dblclick', (e)=>{
                        e.preventDefault();
                        toggleClass(li);
                        if(li.getAttribute("status")==="close"){
                            li.setAttribute("status", "open");
                            addLine(li, entry.items, false);
                        }else{
                            li.setAttribute("status", "close");
                            removeLi(li);
                        }
                    }, false);
                }
                if (parent || main===element){
                    element.appendChild(li);
                }else{
                    positionIndexElement.parentNode.insertBefore(li,positionIndexElement.nextSibling);
                    positionIndexElement = li;
                }
            }
        }
    }


    function removeLi(li) {
        let pathLi = li.getAttribute("path");
        const items = element.getElementsByTagName("li");
        // let index = items.indexOf(li);
        // console.log(index);
        for (let i = 0; i <items.length ; i++) {
            let currPath = items[i].getAttribute("path");
            if(currPath.startsWith(pathLi)){
                if(pathLi!==currPath){
                    element.removeChild(items[i]);
                    i--;
                }
            }
        }
    }

    const toggleClass = (element)=>{
        if(chosenLi===element){
            element.classList.remove("activeLine");
            chosenLi=null;
            return;
        }
        if(chosenLi!==null){
            chosenLi.classList.remove("activeLine");
        }
        element.classList.add("activeLine");
        chosenLi = element;
    };

    const searchForElement = (path)=> {
        let chosenGroup = generalItems[path.shift()];

        for(let i of path){
         chosenGroup = chosenGroup.items[i];
        }
        return chosenGroup;
    };

    // Handling Keyboard Press
    element.onkeydown = checkKey;

    function checkKey(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                upArrow();
                break;
            case 40:
                downArrow();
                break;
            case 37:
                leftArrow();
                break;
            case 39:
                rightArrow();
                break;
            case 13:
                enterKey();
                break;
        }

   }

    function downArrow (){
        // down arrow
        if(chosenLi===null){
            toggleClass(element.firstElementChild);
        }else{
            if(chosenLi === element.lastElementChild){
                return false;
            }
            toggleClass(chosenLi.nextSibling)
        }
    }

    function upArrow (){
        // up arrow
        if(chosenLi===null){
            toggleClass(element.lastElementChild);
        }else{
            if(chosenLi === element.firstElementChild){
                return false;
            }
            toggleClass(chosenLi.previousSibling)
        }
    }

    function leftArrow (){
        // left arrow
        let type = chosenLi.getAttribute("dataType");
        let status = (type==="group")? chosenLi.getAttribute("status"): "";
        if(type==="group" && status==="open"){
            chosenLi.setAttribute("status", "close");
            removeLi(chosenLi);
        }
        if (type === "user" || type==="group" && status==="close"){
            let tabindex = Number(chosenLi.getAttribute("tabindex"));
            if (tabindex===1){
                return false;
            }else{
                let preSibling = chosenLi.previousSibling;
                let preSiblingtabindex = Number(preSibling.getAttribute("tabindex"));

                while(tabindex <= preSiblingtabindex){
                    preSibling = preSibling.previousSibling;
                    preSiblingtabindex = preSibling.getAttribute("tabindex");
                }
                toggleClass(preSibling);
            }
        }
    }

    function rightArrow (){
        // right arrow
        let type = chosenLi.getAttribute("dataType");
        let status = chosenLi.getAttribute("status");
        if(type==="group" && status==="close"){
            //toggleClass(chosenLi);
            chosenLi.setAttribute("status", "open");
            let path = chosenLi.getAttribute("path");
            path  = path.split(",");
            let group = searchForElement(path);
            addLine(chosenLi, group.items, false);
        }
    }

    function enterKey() {
        let type = chosenLi.getAttribute("dataType");
        if(type==="group"){
            let status = chosenLi.getAttribute("status");
            if (status==="open"){
                leftArrow()
            }else{
                rightArrow()
            }
        }
    }


    return {
        load,
        clear,
        element,
    };
}
