const dropZone= document.querySelector(".drop-zone");
const browseBtn= document.querySelector(".browseBtn");
const fileInput=document.querySelector("#fileinput");
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
    console.log(e.dataTransfer.files.length);
    const files=e.dataTransfer.files;    
    if(files.length>0){
        fileInput.files=files;
    }
});

browseBtn.addEventListener("click",()=>{
    fileInput.click();
})

const uploadFile=()=>{
    const file= fileInput.files[0];
    const formData= new formData();
    formData.append(file);
    const xhr= new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        
    }
}