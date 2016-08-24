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

app.get('/signIn', function(req,res){
  res.render('signIn')
})

app.get('/userHome', function(req, res){
  res.render('userHome', {emailId:req.session.emailId})
})

app.get('/newbrew', function(req, res){
    res.render('newbrew', {emailId:req.session.emailId})

})

app.get('/brewOptions', function(req, res){
  console.log('this is /brewOptions res.body', res.body)
  res.render('brewOptions', {emailId:req.session.emailId})
})

app.get('/signOut', function(req, res){
res.render('signOut', {emailId:req.session.emailId})
req.session.destroy()

})

 ////////// POST ROUTES //////////

app.post('/signUp', function(req,res){
   var hash = bcrypt.hashSync(req.body.hashed_password, 10)
    knex('users').insert({email:req.body.email, hashed_password:hash})
       .then(function(data){
         console.log('this is req.body.email', req.body.email)
         req.session.emailId = req.body.email
      res.render('userHome',{emailId:req.session.emailId})
  })
  .catch(function(error){
    console.log('error')
    //  req.session.emailId = 0
     res.redirect('/')
  })
})

app.post('/signIn', function(req,res){
  knex('users').where('email',req.body.email)
    .then(function(data){
     if(req.body.email === ''){
       res.redirect('/')
     }
     else if (bcrypt.compareSync(req.body.hashed_password, data[0].hashed_password)){
       req.session.emailId = data[0].email
       res.redirect('userHome')
     }
     else {
       console.log('incorrect password')
       res.redirect('/')
     }
   })
  .catch(function(error){
    console.log('There is a problem - error!', error)
    res.redirect('signUp')
  })
})

app.post('/newbrew', function(req,res){
  knex('brews').insert({brewName:req.body.brewName, brewer:req.body.brewer, brewStyle:req.body.brewStyle,
                        batchNumber:req.body.batchNumber, brewIngredients:req.body.brewIngredients,
                        brewingProcess:req.body.brewingProcess, brewDate:req.body.brewDate, bottlingDate:req.body.bottlingDate,
                        mashTime:req.body.mashTime, boilTime:req.body.boilTime, original:req.body.original, final:req.body.final,
                        mashTemperature:req.body.mashTemperature, fermentTemperature:req.body.fermentTemperature,
                        batchSize:req.body.batchSize, abv:req.body.abv, tastingNotes:req.body.tastingNotes, emailId:req.session.emailId})
                        .then(function(data){
                          res.render('brewOptions', {emailId:req.session.emailId})
                        })
                        .catch(function(error){
                          console.log('Error', error)
                          res.redirect('/')
                        })
})


/////////// Listen Route //////////////

app.listen(3000, function(){
  console.log('We have lift off on port 3000!')
})
