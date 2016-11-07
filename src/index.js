var allBrews = require('../views/allBrews.hbs')
var brewProfile = require('../views/brewProfile.hbs')
var userHome = require('../views/userHome.hbs')
var brewOptions = require('../views/brewOptions.hbs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function(){

  $('#showBtn').click(function(){
  showAllBeers()
})
})

function showAllBeers() {
  request.get('/allBrews')
  .end(function(err,res){
    var list = allBrews({data:res.body})
    document.body.innerHTML = list

     $('.viewBtn').click(function(e){
       e.preventDefault()
       var id = e.target.id
       console.log('this is the id', e.target.id)
       getAndShowProfile(id)
    })
  })
}

function getAndShowProfile(id) {
   request.get('/beers/'+id)
   .end(function(err,res){
   var htmlFromTemplate = brewProfile(res.body)
   document.body.innerHTML = htmlFromTemplate
   $('#backBtn').click(function(){
   showAllBeers()
     })
   })
 }
