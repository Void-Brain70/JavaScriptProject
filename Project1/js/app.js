console.log("Note");
showNotes();
//if user adds a note add it to the localstorage 
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = 
    {
        title:addtitle.value,
        text:addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesObj)
    showNotes();

});

//Note show function from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard  my-2 mx-2 card" style="width: 18rem;">
           <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-warning">Delete Note</button>
           </div>
        </div>
        `;
    });
    let notesEle=document.getElementById('notes');
    if(notesObj.length!=0)
    {
       notesEle.innerHTML= html;
    }
    else
    {
        notesEle.innerHTML=`Nothing to show..! "Add a Note" section above to add notes..!`
    }
}

//delete node function

function deleteNote(index)
{
    console.log("Deleting",index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//for searching a note 

let search = document.getElementById('searchtxt');

search.addEventListener("input",function(){
    let inputval=search.value.toLowerCase();
    console.log(inputval);
    let noteCards=document.getElementByClassName("noteCard");
    Array.from(noteCards).forEach(function(element)
    {
        let cardtxt=element.getElementsByTagName('p')[0].innerText;
        if(cardtxt.includes(inputval))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    });

});

