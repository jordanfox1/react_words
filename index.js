const app = require('./app')
const port = process.env.PORT || 5000
// const port = 5000

app.listen(port, () =>{
    console.log(`listening on http://localhost${port}`)
})
