function ChatTree(element) {

    let generalItems = [];
    let chosenLi = null;

    function load(items) {
        generalItems = items;
        clear();
        addLine(element);
        element.focus();
    }

    function clear() {
        element.innerHTML = "";
    }

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }


    element.onclick = function(event) {
        event.stopPropagation()
        let target = getEventTarget(event);
        if(target!==element && !(undefined)){
            toggleClass(target);
        }
    };

    element.ondblclick = function(event) {
        event.preventDefault()
        event.stopPropagation()
        let target = getEventTarget(event);
        if(target.data.dataType==="group" && !(undefined)) {
            toggleClass(target);
            if (target.getAttribute("status") === "close") {
                target.setAttribute("status", "open");
                addLine(target);
            } else {
                target.setAttribute("status", "close");
                removeLi(target);
            }
        }
    };



    function addLine(main) {
        let parent = (main === element.lastElementChild);
        let items = (main===element)? generalItems: main.data.items;
        let positionIndexElement=main;

        if(items.length>0){
            let pad = main.getAttribute("tabindex");
            for(let entry of items){
                let li = document.createElement("li");
                let img = document.createElement("img");
                img.setAttribute("src", "pics/user3D.png");
                li.appendChild(img);
                li.data={};
                li.setAttribute("tabindex",""+ (Number(pad)+1));
                li.setAttribute("dataType", entry.type);
                li.data.dataType=entry.type;
                li.setAttribute("style", "padding-left:"+ Number(pad)*10+"px");
                li.appendChild(document.createTextNode(entry.name));

                if(li.data.dataType==="group"){
                    img.setAttribute("src", "pics/group3D.png");
                    li.classList.add("type-group");
                    li.setAttribute("status", "close");
                    li.data.items= entry.items;
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
        let tabLI = li.getAttribute("tabindex");
        let nextSibling = li.nextSibling;
        let nextSiblingTabLI = nextSibling.getAttribute("tabindex");

        while(Number(nextSiblingTabLI)>Number(tabLI)){
            element.removeChild(nextSibling);
            nextSibling = li.nextSibling;
            if(nextSibling===null) return;
            nextSiblingTabLI = nextSibling.getAttribute("tabindex");

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
            chosenLi.setAttribute("status", "open");
            addLine(chosenLi);
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
