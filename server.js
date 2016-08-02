var express = require('express')
var app = express()

app.use(express.static('client'))
app.set('view engine','hbs')

var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = require('knex')(knexConfig[env])
 
app.get('/', function(req, res){
  res.send('index.html')
})

app.get('/signUp', function(req, res){
  res.render('signUp')
})

app.listen(3000, function(){
  console.log('We have lift off on port 3000!')
})
