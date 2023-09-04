const db = require("../libs/mySQL.js")

/**
 * @typedef {Object} Note
 * @property {string} title
 * @property {string} content
 */


class NotesError extends Error {
   /**
    * @param {string} message 
    * @param {number} statusCode 
    */
   constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
   }
}

/**
 * Inserts a new note in the database
 * @param {Note} note 
 * @returns {Promise<number>} id of the created note
 * @throws {Error} if note could not be created
 */
async function createNote(note) {
   const [noteCreated] = await db.query("INSERT INTO notes SET ?", note)
   return noteCreated.insertId
}

/**
 * Gets all notes from the database
 * @returns {Promise<Note[]>}
 * @throws {Error} if notes could not be retrieved
 */
async function getNotes() {
   const [notes] = await db.query("SELECT * FROM notes")
   return notes
}

/**
 * Gets a note by id
 * @param {number} noteId
 * @returns {Note}
 * @throws {NotesError} if note is not found
 */
async function getNoteById(noteId) {
   const [note] = await db.query("SELECT * FROM notes WHERE id = ?", [noteId])

   if (note.length === 0) {
      throw new NotesError(`Note ${noteId} not found`, 404)
   }

   return note
}

/**
 * Updates a note by id
 * @param {number} noteId
 * @param {Note} noteData
 * @returns {number} id of the updated note
 * @throws {Error} if note is not found
 */
async function updateNoteById(noteId, noteData) {
   const [result] = await db.query("UPDATE notes SET ? WHERE id = ?", [noteData, noteId])

   if (result.affectedRows === 0) {
      throw new NotesError(`Could not update note ${noteId}, note not found`, 404)
   }

   return noteId
}

/**
 * Deletes a note by id
 * @param {number} noteId
 * @throws {Error} if note is not found
 * @returns {number} id of the deleted note
 */
async function deleteNoteById(noteId) {
   const [result] = await db.query("DELETE FROM notes WHERE id = ?", [noteId])

   if (result.affectedRows === 0) {
      throw new NotesError("Note not found", 404)
   }

   return noteId
}

module.exports = {
   createNote,
   getNotes,
   getNoteById,
   updateNoteById,
   deleteNoteById,
   NotesError
}