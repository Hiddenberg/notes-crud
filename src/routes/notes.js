const express = require("express")
const router = express.Router()
const { getNotes, getNoteById, updateNoteById, createNote, deleteNoteById } = require("../services/noteServices.js")

router.get("/", (req, res) => {
   // getNotes()
   res.json({message: "get notes"})
})

router.post("/", (req, res) => {
   const note = req.body

   // createNote()
   res.json({message: "create note", note})
})

// ****************** Individual note routes ******************
router.get("/:noteId", (req, res) => {
   const noteId = req.params.noteId

   // getNoteById(noteId)
   res.json({message: `get note ${noteId}`})
})

router.put("/:noteId", (req, res) => {
   const noteId = req.params.noteId

   // updateNoteById(noteId)
   res.json({message: `update note ${noteId}`})
})

router.delete("/:noteId", (req, res) => {
   const noteId = req.params.noteId

   // deleteNoteById(noteId)
   res.json({message: `delete note ${noteId}`})
})



module.exports = router