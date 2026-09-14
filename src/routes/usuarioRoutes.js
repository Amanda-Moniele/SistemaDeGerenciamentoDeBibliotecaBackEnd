const express = require("express")

const {cadastrarUsuario} = require("../controllers/usuarioController.js")

const router = express.Router()

router.post("/usuarios", cadastrarUsuario)

module.exports = router