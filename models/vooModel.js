const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vooSchema = Schema({
    idVoo: Number,
    aviao: String,
    destino: String,
    localSaida: String
});

module.exports = mongoose.model('Voo', vooSchema);