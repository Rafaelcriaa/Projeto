const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/passageiroAuth");
const vooController = require("../controllers/vooController");

routes.get("/voo", auth, vooController.listarVoos);
routes.get("/voo/cadastrar/:idVoo?", auth, vooController.cadastrar);
routes.post("/voo", auth, vooController.cadastrarPost);
routes.get("/voo/:idVoo", auth, vooController.detalhar);
routes.get("/voo/remover/:idVoo", auth, vooController.remover);

module.exports = routes;