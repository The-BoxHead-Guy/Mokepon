// Importing Express.JS
const express = require("express")
const cors = require("cors")

// Executing express.js
const app = express()

app.use(cors()) // A library of Express
app.use(express.json())

const players = []

class Player {
    constructor(id) {
        this.id = id;
    }

    asignMokepon(mokepon) {
        this.mokepon = mokepon
    }

    refreshPosition (x, y) {
        this.x = x;
        this.y = y;
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
    const x = req.body.x || 0
    const y = req.body.y || 0
    const playerIndex = player.findIndex((player) => playerId === player.id)

    if (playerIndex) {
        players[playerIndex].refreshPosition(x, y);
    }

    res.end()
})

// Initiating the server
app.listen(8080, () => {
    console.log("Servidor funcionando")
})