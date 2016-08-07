var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var path = require('path')

app.use(express.static('client'))
app.set('views',path.join(__dirname,'views'))


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','hbs')


var knexConfig = require('./knexfile')
var env = process.env.NODE_ENV || 'development'
var knex = require('knex')(knexConfig[env])



 ////////// GET ROUTES //////////

app.get('/', function(req,res){
  res.send('index.html')
})

app.get('/signUp', function(req,res){
  res.render('signUp')
})

app.get('/userHome', function(req, res){
  res.render('userHome')
})


app.listen(3000, function(){
  console.log('We have lift off on port 3000!')
})

 ////////// POST ROUTES //////////

 app.post('/signIn', function(req,res){

 })

app.post('/signUp', function(req,res){

  if (req.body.email === ''){
    res.redirect('/signUp')
  }
   var hash = bcrypt.hashSync(req.body.password, 10)
    knex('users').insert({email:req.body.email, hashed_password:hash})
     .then(function(data){
      res.redirect('userHome')
      console.log('success')
  })
  .catch(function(error){
    console.log('error')
     res.redirect('/')
  })

})
