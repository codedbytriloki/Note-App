const addNewNoteBtn = document.getElementById("addNewNoteBtn");
const noteModel = document.getElementById("noteModel");
const saveNote = document.getElementById("saveNote");
const noteDescription = document.getElementById("noteDescription");
const noteTitle = document.getElementById("noteTitle");
const closeProp = document.getElementById("closeProp");
const notesContainer = document.querySelector('.notesContainer');

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function showNotes(){
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note-card";
    noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p >${note.description}</p>
        <div>
           <span id="date">${note.date}</span>
          <span id="delete" onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i></span>
        </div>
    `;

    notesContainer.appendChild(noteDiv);
  })
}

function deleteNote(index){
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function addNote(){
  const title = noteTitle.value.trim();
  const description = noteDescription.value.trim();

  if(title && description){
    const date = new Date().toLocaleDateString();
    notes.push({title, description, date});

    localStorage.setItem("notes", JSON.stringify(notes));
    closeModel();
    showNotes();
    noteTitle.value = "";
    noteDescription.value = "";
    
  }
}

function closeModel(){
  noteModel.style.display = "none";
}

saveNote.addEventListener('click', addNote);

addNewNoteBtn.addEventListener('click', () => {
  noteModel.style.display = "flex";
})

closeProp.addEventListener('click', () => {
  noteModel.style.display = "none";
})

window.addEventListener('click', (e) => {
  if(e.target === noteModel){
    closeModel();
  }
})

showNotes();


