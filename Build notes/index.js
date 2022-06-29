console.log("Welcome to notes app");
showNotes();  //call function

// Add event listener 

let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', (e) => {
    let addText = document.getElementById('addText')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    addText.value = "";
    // console.log(notesObj);
    showNotes();  //call function


})

// Function to show data from localStorege
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }


    let html = "";
    notesObj.forEach(function (element, index) {

        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
       <h5 class="card-title">Notes${index + 1}</h5>
       <p class="card-text">${element}</p>
       <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
     </div>
   </div>
        `});

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `Nothing to show use "Add note" `
    }

}


// Function to deete a note
function deleteNote(index) {
    // console.log("i am deleting",index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes();
}

// Search text 
let search = document.getElementById('searchText')
search.addEventListener('input',function(){


    let inputval = search.value.toLowerCase();
    // console.log(`input event fired.`,inputval);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let carTxt = element.getElementsByTagName('p')[0].innerText;

        if(carTxt.includes(inputval)){
            element.style.display = "block"
        }else{
            element.style.display = "none"

        }
    })
})