const dropZone= document.querySelector(".drop-zone");

dropZone.addEventListener("dragover",(e)=>{
    console.log('Dragging');
    dropZone.classList.add("dragged");
});