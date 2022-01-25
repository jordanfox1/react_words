
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
require('dotenv').config()

//middleware
app.use(cors())
// app.use(express.json())

app.use(bodyParser.json())

const Pool = require('pg').Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})


pool.query('SELECT * FROM public."SavedWords"', (error, results) => {
    if (error) throw error
    // console.log(results)
})

app.get('/', (request, response) => { //app.get('route', cbf(request, response))
    // sending a response back
    response.send({ info: "Word Search App" })
}) // if I do a get request to this route, this callback will be executed


app.get('/words', async (req, res) => {
    try {
        const allWords = await pool.query('SELECT * FROM public."SavedWords"')
        res.json(allWords.rows);
    } catch (error) {
        console.log(error)
    }
})

app.post('/word_list', (req, res) => {
    pool.query('INSERT INTO "SavedWords" (word, definition) VALUES ($1, $2) RETURNING *', [req.body.word, req.body.definition], (error, results) => {
        if (error) {
            console.log(req.body)
            res.status(422).send({ error: error.message })
        } else {
            res.send(results.rows[0])
        }
    })
})

app.post('/entries', (req, res) => {
    pool.query("INSERT INTO entries (content, category_id) VALUES ($1, $2) RETURNING *", [req.body.content, req.body.cat_id], (error, results) => {
        if (error) {
            res.status(422).send({ error: error.message })
        } else {
            res.send(results.rows[0])
        }
    })
})

module.exports = app