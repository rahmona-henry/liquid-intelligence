var express = require('express')
var app = express()

app.use(express.static('client'))

app.get('/', function(req, res){
  res.send('client/index.html')
})

app.listen(3000, function(){
  console.log('We have lift off on port 3000!')
})
