const vooModel = require("../models/vooModel");

class VooController {
    static async listarVoos(req, res){
        const salvo = req.query.s;
        const deletado = req.query.d;
        const atualizado = req.query.a;
        const voos = await vooModel.find();
        res.render("voo/voos", {voos, salvo, deletado, atualizado});
    };

    static async cadastrar(req, res){
        const idVoo = req.params.idVoo;
        console.log(idVoo)
        let escondido = "";
        let voo = {};
        if (idVoo){
            voo = await vooModel.findOne({idVoo: idVoo});
            escondido = "hidden";
        }
        res.render("voo/cadastrarVoo", {voo, escondido});
    };

    static async cadastrarPost(req, res){
        const voo = req.body;
        if (voo.id){
            await vooModel.findOneAndUpdate({idVoo: voo.idVoo},
            {
                localSaida: voo.saida,
                destino: voo.destino,
                aviao: voo.aviao
            });
            res.redirect("/voo?a=1");

        } else{
            const novoVoo = new vooModel({
                idVoo: voo.idVoo,
                localSaida: voo.saida,
                destino: voo.destino,
                aviao: voo.aviao
            })
            await novoVoo.save();
            res.redirect("/voo?s=1");
        }

    };

    static async detalhar(req, res){
        const idVoo = req.params.idVoo;
        const voo = await vooModel.findOne({idVoo: idVoo});
        res.render("voo/detalharVoo", {voo});
    };

    static async remover(req,res){
        const idVoo = req.params.idVoo;
        await vooModel.findOneAndDelete({idVoo: idVoo});
        res.redirect("/voo?d=1");
    };
}
module.exports = VooController;