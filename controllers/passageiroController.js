const passageiroModel = require("../models/passageiroModel");
const  bcrypt = require ("bcryptjs");

class PassageiroController{

    static async listarPassageiros(req, res){
        const salvo = req.query.s;
        const deletado = req.query.d;
        const atualizado = req.query.a;
        const passageiros = await passageiroModel.find();
        res.render("passageiro/passageiros", {passageiros, salvo, deletado, atualizado});
    };

    static async cadastrarPassageiro(req, res){
        const email = req.params.email;
        const jaCadastrado = req.query.c;
        let passageiro = {};
        let escondido = "";
        if (email){
            passageiro = await passageiroModel.findOne({email: email});
            escondido = "hidden";
        }
        res.render("passageiro/cadastrar", {passageiro, escondido, jaCadastrado});
    };

    static async cadastrarPost(req, res){
        const passageiro = req.body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(passageiro.senha, salt);
        if (passageiro.id){
            await passageiroModel.findOneAndUpdate({email: passageiro.email},
            {
                nome: passageiro.nome,
                senha: hash
            });
            res.redirect("/passageiro?a=1");
        } else{
            const email = await passageiroModel.findOne({email: passageiro.email});
            if(email){
                res.redirect("/passageiro/cadastrar?c=1")
            } else{
                const novoPassageiro = new passageiroModel({
                    email: passageiro.email,
                    nome: passageiro.nome,
                    senha: hash
                })
                await novoPassageiro.save();
                console.log(novoPassageiro);
                res.redirect("/passageiro?s=1");
            }
        }
    };

    static async detalharPassageiro(req, res){
        const email = req.params.email;
        const passageiro = await passageiroModel.findOne({email: email});
        res.render("passageiro/detalhar", {passageiro});
    };

    static async removerPassageiro(req, res){
        const email = req.params.email;
        await passageiroModel.findOneAndDelete({email: email});
        res.redirect("/passageiro?d=1");
    };

    static async login(req, res){
            res.render("passageiro/login");
    };

    static async loginPost(req, res){
        const dados = req.body;
        console.log(dados)
        const passageiro = await passageiroModel.findOne({email: dados.email});
        if (passageiro){
            if (bcrypt.compareSync(dados.senha, passageiro.senha)){
                console.log(dados.email);
                req.session.passageiro = dados.email;
                res.redirect("/");
            } else{
                res.send("E-mail e/ou senha incorreto(s)");
            }
        }else{
            res.send("E-mail e/ou senha incorreto(s)");
        }
    }

    static async logout(req, res){
        req.session.passageiro = undefined;
        res.redirect("/passageiro/login");
    }
}

module.exports = PassageiroController;