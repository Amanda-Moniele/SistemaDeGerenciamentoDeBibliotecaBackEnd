const express = require("express")
const app = express()

const cors = require("cors")
require("dotenv").config()
app.use(cors())

app.use(express.json())
const usuarioRoutes = require("../src/routes/usuarioRoutes.js")
app.use(usuarioRoutes)


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

