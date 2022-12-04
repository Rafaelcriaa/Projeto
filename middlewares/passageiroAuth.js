function auth(req, res, next){
    if(req.session.passageiro){
        next();
    }else{
        res.redirect("/passageiro/login");
    }
}
module.exports = auth;