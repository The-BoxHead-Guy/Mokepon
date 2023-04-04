// Importing Express.JS
const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')

// Executing express.js
const app = express()

app.use(cors()) // A library of Express
app.use(express.json())

// A library that analyses our 'req.body'
app.use(bodyParser.urlencoded({extended: true}))

const players = []

class Player {
    constructor(id) {
        this.id = id;
    }

    asignMokepon(mokepon) {
        this.mokepon = mokepon
    }

    refreshPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    asignAttacks(attacks) {
        this.attacks = attacks
    }
}

class Mokepon {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, res) => {
    const id = `${Math.random()}`
    
    const player = new Player(id)

    players.push(player) // endpoint
    
    res.setHeader('Access-Control-Allow-Origin', "*")

    res.send(id)
})

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""
    const name = req.body.mokepon || ""
    const mokepon = new Mokepon(name)

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].asignMokepon(mokepon)
    }

    console.log(players);
    console.log(playerId);
    res.end()
})

app.post("/mokepon/:playerId/position", (req, res) => {
    const playerId = req.params.playerId || ""
    let x = req.body.pointX || 0
    let y = req.body.pointY || 0

    // Player index
    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex) {
        players[playerIndex].refreshPosition(x, y);
    }

    const enemies = players.filter((players) => playerId !== players.id)

    res.send({
        enemies
    })
})

app.post("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const attacks = req.body.attacks || []

    const playerIndex = players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].asignAttacks(attacks)
    }
    res.end()
})

app.get("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id === playerId)

    res.send({
        attacks: player.attacks || []
    })
})

// Initiating the server
app.listen(8080, () => {
    console.log("Servidor funcionando")
})