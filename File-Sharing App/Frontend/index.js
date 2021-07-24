const dropZone= document.querySelector(".drop-zone");

//for adding the class dragged when an item is dragged
dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged")){
        dropZone.classList.add("dragged");   
    }
});

//for removing the class dragged
dropZone.addEventListener("dragleave",(e)=>{
    dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
});