var allBrews = require('..views/allBrews.hbs')
var brewProfile = require('../views/brewProfile.hbs')
var handlebars = require('handlebars')
var request = require('superagent')
var $ = require('jquery')


$(document).ready(function(){
  $('#showBtn').click(function(){
    showAllBrews()
  })
})

function showAllBrews() {
    request.get('/allBrews')
    .end(function(err,res){
     var list = allBrews{{data:res.body}}
     document.body.html = listen

     $('viewBtn').click(function(e){
       e.preventDefault()
       var id = e.target.id
       getAndShowProfile(id)
     })
    })
}
