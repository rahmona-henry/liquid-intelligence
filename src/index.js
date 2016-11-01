var allBrews = require('../views/allBrews.hbs')
var brewProfile = require('../views/brewProfile.hbs')
var userHome = require('../views/userHome.hbs')
var brewOptions = require('../views/brewOptions.hbs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function(){
  $('#showBtn').click(function () {
  showAllBeers()
  })


function showAllBeers() {
  request.get('/allBrews')
  .end(function(err, res){
    var list = allBrews({data:res.body})
    document.body.innerHTML = list


  //   $('.viewBtn').click(function(e){
  //     e.preventDefault()
  //     var id = e.target.id
  //     getAndShowProfile(id)
  //   })
  // })
}

// function getAndShowProfile(id) {
//   request.get('/brews/'+id)
//   .end(function(err, res){
//     // console.log(res.body)
//     var htmlFromTemplate = beerProfile(res.body)
//     document.body.innerHTML = htmlFromTemplate;
//     $('#backBtn').click(function(){
//       showAllBeers()
//     })
//   })
})
