var allBrews = require('../views/allbrews.hbs')
var brewProfile = require('../views/brewProfile.hbs')
var userHome = require('../views/userHome.hbs')
var brewOptions = require('../views/brewOptions.hbs')
var request = require('superagent')
var $ = require('jquery')


$(document).ready(function(){

  $('#showBtn').click(function(){
    console.log('showBtn is getting clicked')
    // showAllBrews()
})

function showAllBrews() {
    request.get('/allbrews')
    .end(function(err,res){
     var list = allBrews{{data:res.body}}
     document.body.html = list
    })
}
