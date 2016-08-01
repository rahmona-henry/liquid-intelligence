var express = require('express')
var app = express()

app.use(express.static('client'))
app.set('view engine','hbs')
// app.set('views', path.join(_dirname,'client'))

app.get('/', function(req, res){
  res.send('index.html')
})

app.get('/signUp', function(req, res){
  res.render('signUp')
})

app.listen(3000, function(){
  console.log('We have lift off on port 3000!')
})
