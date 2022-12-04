const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passageiroSchema = Schema({
    email: String,
    nome: String,
    senha: String
})

module.exports = mongoose.model('Passageiro', passageiroSchema);