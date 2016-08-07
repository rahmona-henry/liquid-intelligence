var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var path = require('path')
var session = require('express-session')
var KnexSessionStore = require('connect-session-knex')(session)
var store = new KnexSessionStore({knex: knex})

app.use(express.static('client'))
app.set('views',path.join(__dirname,'views'))


app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','hbs')

app.use(session({
  secret: 'liquid network',
  saveUninitialized: true,
  resave: true,
  store: store
}))

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

// app.get('signIn', function(req,res){
//   res.render('signIn')
// })

app.get('/userHome', function(req, res){
  res.render('userHome')
})


app.listen(3000, function(){
  console.log('We have lift off on port 3000!')
})

 ////////// POST ROUTES //////////



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


app.post('/signIn', function(req,res){
  knex('users').where('email',req.body.email)
    .then(function(data){
     if(req.body.email === ''){
       res.redirect('/')
     }
     else if (bcrypt.compareSync(req.body.password, data[0].hashed_password)){
       req.session.userId=data[0].
       res.redirect('userHome')
       console.log ('success! sign in happend by user' + req.session.userID + '!' )
     }
     else {
       console.log('incorrect password')
       res.redirect('/')
     }
   })
  .catch(function(error){
    console.log('There is a problem - error!', error)
    req.session.userId = 0
    res.redirect('/signUp')
  })

})
