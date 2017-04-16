var request = require('superagent');
var handlebars = require('handlebars');
var $ = require('jquery')

var userHome = require('../views/userHome.hbs');
var allBrews = require('.../views/allBrews.hbs');
var brewProfile = require('../views/brewProfile.hbs');
var brewOptions = require('../views/brewOptions.hbs');




$(document).ready(function(){
  $('#showBtn').click(function(){
  showAllBeers()
})
})

function showAllBeers() {
  request.get('/allBrews')
  .end(function(err,res){
    // console.log('this is res',res)
    var list = allBrews({data:res.body})
    document.body.innerHTML = list

     $('.viewBtn').click(function(e){
       e.preventDefault()
       var id = e.target.id
       getAndShowProfile(id)
    })
  })
}

function getAndShowProfile(id) {
   request.get('/brews/'+id)
   .end(function(err,res){
   var htmlFromTemplate = brewProfile(res.body)
   document.body.innerHTML = htmlFromTemplate
   $('#backBtn').click(function(){
   showAllBeers()
     })
   })
 }
