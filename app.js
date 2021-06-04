const express = require('express')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  console.log('req: ', req.query);
  res.send('Hello World!')
})

app.post('/demo', (req, res) => {  
  console.log('req: ', req.body);
  res.send('Hello World!')
})

app.put('/', (req, res) => {
  console.log('req: ', req.body);
  res.send('Hello World!')
})

app.delete('/', (req, res) => {
  console.log('req: ', req.body);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})