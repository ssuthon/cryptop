const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('./logger').get('main')
const stats = require('./stats')

const port = 8007

app.disable('x-powered-by');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/ping', function(req, res){
	res.send({msg: 'ok', response: new Date()})
})

app.get('/stats', function(req, res){
    res.send(stats.current)
})

app.listen(port, () => {
  logger.info(`App listening on port ${port}`)
})