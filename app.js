var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require("body-parser")

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const usr = JSON.parse(fs.readFileSync('users.json'))
var count = Object.keys(usr).length

app.listen(8080, () => {
    console.log("foi")
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    //interface de user logado
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.post("/login", (req, res) => {
    var userAtual
    var s = req.body.suaSenha
    var l = req.body.seuLogin
    for(i=0;i<count;i++) {
        if(l == usr.users[i].login){
            if(s == usr.users[i].senha){
                usr.users[i].logged = true
                userAtual = usr.users[i]
                fs.writeFileSync('users.json', JSON.stringify(usr))
                res.sendFile(__dirname+'/index.html')
            }
        }
        else {
            res.sendFile(__dirname+'/login.html')
        }
    }
})

app.get("/registrar", (req, res) => {
    res.sendFile(__dirname + "/registro.html")
})

app.post("/registrar", (req, res) => {
    if (req.body.suaSenhaRepetida != req.body.suaSenha) {
        // alertar senhas diferentes
        res.sendFile(__dirname + "/registro.html")
    } else {
        var loginUser = req.body.seuLogin
        var senhaUser = req.body.suaSenha
        var idUser = count
        var usernameUser = req.body.username
        var usuario = {
            "username": usernameUser,
            "id": idUser,
            "senha": senhaUser,
            "login": loginUser
        }
        usr.users.push(usuario)
        fs.writeFileSync('users.json', JSON.stringify(usr))
        res.sendFile('/index.html')
    }
        //avisar que registrou ^
})

app.get("/mudarLogin", (req, res) => {
    res.sendFile(__dirname + "/mudarlogin.html")  
})

app.get("/mudarSenha", (req, res) => {
    res.sendFile(__dirname + "/mudarsenha.html")
})

app.post("/mudarLogin", (req, res) => {
    for(i=0;i<count;i++){
        if(req.body.username = usr.users[i].username){
            usuario = usr.users[i]
        }
    }
    if(suaSenha == usuario.senha){
        usuario.login = req.body.novoLogin
        res.sendFile(__dirname+'/index.html')
    }
})

app.post("/mudarSenha", (req, res) => {
    for(i=0;i<count;i++){
        if(req.body.seuLogin = usr.users[i].login){
            usuario = usr.users[i]
        }
    }
    if(usuario.senha == req.body.suaSenha){
        usuario.senha = req.body.novaSenha
        res.sendFile(__dirname+'/index.html')
    }
})

//criar pag admin
//ajeitar interacoes entre paginas
//funcao deletar


//criar server


