var allBrews = require('../views/allbrews.hbs')
var brewProfile = require('../views/brewProfile.hbs')
var userHome = require('../views/userHome.hbs')
var brewOptions = require('../views/brewOptions.hbs')
var request = require('superagent')
var $ = require('jquery')


$(document).ready(function(){
  $('#showBtn').click(function(){
    alert('showBtn is getting clicked')
  })
})

// function showAllBrews() {
//     request.get('/allbrews')
//     .end(function(err,res){
//      var list = allBrews{{data:res.body}}
//      document.body.html = list
//
//      $('.viewBtn').click(function(e){
//        e.preventDefault()
//        var id = e.target.id
//        getAndShowProfile(id)
//      })
//     })
// }
