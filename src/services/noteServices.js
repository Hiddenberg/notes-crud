const db = require("../libs/mySQL.js")

async function createNote(note) {
   // TODO: note creation
}

function getNotes() {
   // TODO: get all notes
}

function getNoteById(noteId) {
   // TODO: get note by id
}

function updateNoteById(noteId, note) {
   // TODO: update note by id
}

function deleteNoteById(noteId) {
   // TODO: delete note by id
}

module.exports = {
   createNote,
   getNotes,
   getNoteById,
   updateNoteById,
   deleteNoteById
}