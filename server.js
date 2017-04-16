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
app.set('port', (process.env.PORT || 3000));
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
  res.send('signIn')
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

app.get('/newBrew', function(req, res){
    res.render('newbrew', {emailId:req.session.emailId})

})

app.get('/brewOptions', function(req, res){
  res.render('brewOptions', {emailId:req.session.emailId})
})

app.get('/allBrews', function(req, res){
   knex.select().table('beer')
   .then(function(data){
    //  console.log('this is data',data)
     res.json(data)
  })

})

app.get('/brews/:id', function(req, res){
  knex('beer').where('id',req.params.id)
  .then(function(data){
    var brew = data[0]
    res.json(brew)
  })
} )

app.get('/signOut', function(req, res){
res.render('signOut', {emailId:req.session.emailId})
req.session.destroy()

})

 ////////// POST ROUTES //////////

app.post('/signUp', function(req,res){
   var hash = bcrypt.hashSync(req.body.hashed_password, 10)
    knex('users').insert({email:req.body.email, hashed_password:hash})
       .then(function(data){
         req.session.emailId = req.body.email
         res.render('userHome',{emailId:req.session.emailId})
  })
  .catch(function(error){
    console.log('error')
     res.redirect('/')
  })
})

app.post('/signIn', function(req,res){
  knex('users').where({email:req.body.email})
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

 app.post('/newBrew', function(req,res){
  //  console.log('this is req.session,req.body', req.session, req.body)
     knex('beer').insert({
       emailId:req.session.emailId,brewName:req.body.brewName,
       brewStyle:req.body.brewStyle,brewer:req.body.brewer,
       brewDate:req.body.brewDate,malts:req.body.malts,hops:req.body.hops,
       yeast:req.body.yeast,strikeVolume:req.body.strikeVolume,
       mashTemperature:req.body.mashTemperature,mashTime:req.body.mashTime,
       spargeWater:req.body.spargeWater,spargeTemperature:req.body.spargeTemperature,
       boilVolume:req.body.boilVolume,boilTime:req.body.boilTime,
       original:req.body.original,fermentTemperature:req.body.fermentTemperature,
       fermentTime:req.body.fermentTime,final:req.body.final,
       dextroseDosage:req.body.dextroseDosage,batchSize:req.body.batchSize,abv:req.body.abv
                         })
                           .then(function(data){
                            //  console.log('this is data', data)
                           res.render('brewOptions', {emailId:req.session.emailId})
                         })
                         .catch(function(error){
                           console.log('Error', error)
                           res.redirect('/')
                         })
})


/////////// Listen Route //////////////
 var port = process.env.PORT || 3000
 app.listen(port, function(){
 console.log('We have lift off on port' + port)
 })
