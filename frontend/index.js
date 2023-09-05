/**
 * @typedef {Object} Note
 * @property {number} id
 * @property {string} title
 * @property {string} content
 */

/**
 * Renders a note in the DOM
 * @param {Note} note
 */
async function renderNote(note) {
   const noteTemplate = `<div data-noteid=${note.id} class="note note--expanded">
   <button class="button button--deleteNote">X</button>
   <h3 class="note__title">${note.title}</h3>
   <p class="note__text">${note.content}</p>
   </div>`;

   const notesContainer = document.querySelector(".notesContainer");
   notesContainer.insertAdjacentHTML("beforeend", noteTemplate);

   // Adding animation
   const noteElement = document.querySelector(`.note[data-noteid="${note.id}"]`);

   // Event listeners
   const deleteButtonElement = noteElement.querySelector(".button--deleteNote");
   const titleElement = noteElement.querySelector(".note__title");
   const contentElement = noteElement.querySelector(".note__text");

   const deleteListener = async (event) => {
      await deleteNote(note.id);

      event.target.remove();

      noteElement.classList.remove("note--expanded");
      setInterval(() => {
         noteElement.classList.add("note--deleted");
      }, 0);

   
      setTimeout(() => {
         deleteNoteFromDOM(note.id);
      }, 500);

      noteElement.removeEventListener("click", deleteListener);
   };

   const editListener = (event) => {
      event.target.contentEditable = true;
      event.target.focus();

      const originalText = event.target.textContent;

      const enterListener = async (event) => {
         if (event.key === "Enter") {
            event.target.contentEditable = false;

            if (event.target.classList.contains("note__title")) {
               await updateNoteById(note.id, { title: event.target.textContent });
            } else if (event.target.classList.contains("note__text")) {
               await updateNoteById(note.id, { content: event.target.textContent });
            }

            event.target.removeEventListener("keydown", enterListener);
         }

         if (event.key === "Escape") {
            event.target.contentEditable = false;
            event.target.textContent = originalText;
            event.target.removeEventListener("keydown", enterListener);
         }
      };

      event.target.addEventListener("keydown", enterListener);
   };

   deleteButtonElement.addEventListener("click", deleteListener);
   titleElement.addEventListener("dblclick", editListener);
   contentElement.addEventListener("dblclick", editListener);
}

/**
 * Deletes a note from the DOM
 * @param {number} noteid
 */
function deleteNoteFromDOM(noteid) {
   const note = document.querySelector(`.note[data-noteid="${noteid}"]`);
   note.remove();
}

// Note CRUD operations

/**
 * Gets all the notes from the API
 * @returns {Promise<Note[]>}
 * @throws {Error} if notes could not be retrieved
 */
async function getAllNotes() {
   const response = await fetch("/api/notes");
   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }
   const json = await response.json();

   const notes = json.data.notes;

   return notes;
}

/**
 * Gets a note by id
 * @param {number} noteid
 * @returns {Promise<Note>}
 */
async function getNoteById(noteid) {
   const response = await fetch(`/api/notes/${noteid}`);

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const note = await response.json().data.note;

   return note;
}

/**
 * Saves a new note in the DB
 * @param {Note} noteData
 */
async function createNote(noteData) {
   const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const json = await response.json();

   const noteId = json.data.noteId;

   return noteId;
}

/**
 * Updates a note in the DB
 * @param {number} noteid
 * @param {Note} noteData
 * @returns {Promise<number>} id of the updated note
 */
async function updateNoteById(noteid, noteData) {
   const response = await fetch(`/api/notes/${noteid}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const updatednoteid = await response.json().noteid;

   return updatednoteid;
}

/**
 * Deletes a note from the DB
 * @param {number} noteid
 * @returns {Promise<number>} id of the deleted note
 */
async function deleteNote(noteid) {
   const response = await fetch(`/api/notes/${noteid}`, {
      method: "DELETE",
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const deletednoteid = await response.json().noteid;

   return deletednoteid;
}

async function main() {
   const notes = await getAllNotes();
   notes.forEach((note) => renderNote(note));

   // Event listeners
   const newNoteForm = document.querySelector(".noteForm");
   const titleInput = document.getElementById("noteTitle");
   const contentInput = document.getElementById("noteContent");
   newNoteForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const noteData = new FormData(newNoteForm);
      const note = {
         title: noteData.get("title"),
         content: noteData.get("content"),
      };
      const noteId = await createNote(note);

      renderNote({ ...note, id: noteId });

      titleInput.value = "";
      contentInput.value = "";
   });
}

main();
