const express = require("express")
const router = express.Router()
const { getNotes, getNoteById, updateNoteById, createNote, deleteNoteById, NotesError } = require("../services/noteServices.js")

router.get("/", async (req, res, next) => {
   try {
      const notes = await getNotes()
      res.json({
         message: "ok",
         data: {
            notes
         }
      })
   } catch (error) {
      next(error)
   }
})

router.post("/", async (req, res, next) => {
   try {
      const note = req.body
      if (!note.title || !note.content) {
         throw new NotesError("Title and description are required", 400)
      }

      const noteCreated = await createNote(note)
      res.json({
         message: "Note created",
         noteId: noteCreated
      })
   } catch (error) {
      next(error)
   }
})

// ****************** Individual note routes ******************
router.get("/:noteId", async (req, res, next) => {
   try {
      const noteId = req.params.noteId

      const note = await getNoteById(noteId)
      res.json({
         message: `ok`,
         data: {
            note
         }
      })
   } catch (error) {
      next(error)
   }
})

router.put("/:noteId", async (req, res, next) => {
   try {
      const noteId = req.params.noteId
      const note = req.body

      const updatedNoteId = await updateNoteById(noteId, note)
      res.json({
         message: `Note ${noteId} updated`,
         data: {
            noteId: updatedNoteId
         }
      })
   } catch (error) {
      next(error)
   }
})

router.delete("/:noteId", async (req, res, next) => {
   try {
      const noteId = req.params.noteId

      const deletedNoteId = await deleteNoteById(noteId)
      res.json({
         message: `note ${deletedNoteId} deleted`,
         data: {
            noteId
         }
      })
   } catch (error) {
      next(error)
   }
})



module.exports = router