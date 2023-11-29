const express = require('express')
const morgan = require('morgan') // permet de créer des logs auto sur les requetes express
const sequelize = require('./db/sequelize')
const path = require('path')
const app = express()
const port = 3010;
const cors = require('cors');

// const fs = require('fs'); // fichier node permettant de faire du file system

sequelize.initDb()

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

// Init Middleware
    // TimeStamp Queries Logger

// Run Middleware

// Init & Set Route
app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)


app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware quand l'url de la requête n'aboutit à rien
app.get('*', (req, res) => {
    res.status(404).json({ message: `L'url demandé n'existe pas.` })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})