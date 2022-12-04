const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/passageiroAuth");
const passageiroController = require("../controllers/passageiroController");

routes.get("/passageiro", auth, passageiroController.listarPassageiros);
routes.post("/passageiro", passageiroController.cadastrarPost);
routes.get("/passageiro/cadastrar/:email?", passageiroController.cadastrarPassageiro);
routes.get("/passageiro/remover/:email", auth, passageiroController.removerPassageiro);
routes.get("/passageiro/login", passageiroController.login);
routes.post("/passageiro/login", passageiroController.loginPost);
routes.get("/passageiro/remover/:email", auth, passageiroController.removerPassageiro);
routes.get("/passageiro/:email", auth, passageiroController.detalharPassageiro);
routes.post("/passageiro/logout", passageiroController.logout);

module.exports = routes;