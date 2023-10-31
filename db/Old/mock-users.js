const { DATE } = require("sequelize");

const users =[
    {
        firstname:"Simon",
        lastname:"Reil",
        username:"Simon",
        password:"mdp",
        role: 2
    },
    {
        firstname:"Pierre",
        lastname:"Rochard",
        username:"Pierre",
        password:"jesuispierrechampiondetypepierre",
        role: 3
    },
    {
        firstname:"jane",
        lastname:"Doe",
        password:"myWord",
        role: 1
    },
    {
        firstname:"Rémi",
        lastname: "Doami",
        username:"Van33",
        password:"psw",
        role: 3
    },
    {
        firstname:"Jean",
        lastname:"Dupond",
        username:"Jean Dupond",
        password:"psw",
        role: 2
    },
    {
        firstname:"Régis",
        lastname:"Chen",
        username:"BGdubourgPalette1",
        password:"pokemon",
        role: 1
    },

]

module.exports = users;