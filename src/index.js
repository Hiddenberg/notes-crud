const express = require("express")

const app = express()
const port = process.env.PORT ?? 8080

app.get("/", (req, res) => {
   res.send("hi")
})

app.listen(port, () => {
   console.log(`Notes crud running on port: ${port}`)
})