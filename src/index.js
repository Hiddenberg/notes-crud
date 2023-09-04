require("dotenv").config()
const express = require("express")
const notesRouter = require("./routes/notesRouter.js")
const errorHandler = require("./middlewares/errorHandler.js")
const path = require("path")

const app = express()
const port = process.env.PORT ?? 8080

app.use(express.json())


// test endpoint
// app.get("/", (req, res) => {
//    res.send("hi")
// })

// Notes CRUD
app.use(("/"), express.static(path.join(__dirname, "../frontend")))
app.use("/api/notes", notesRouter)

// Error handler
app.use(errorHandler)

app.listen(port, () => {
   console.log(`Notes crud running on port: ${port}`)
})