require("dotenv").config()
const express = require("express")
const notesRouter = require("./routes/notes.js")


const app = express()
const port = process.env.PORT ?? 8080

app.use(express.json())

app.use("/api/notes", notesRouter)
app.get("/", (req, res) => {
   res.send("hi")
})

app.listen(port, () => {
   console.log(`Notes crud running on port: ${port}`)
})