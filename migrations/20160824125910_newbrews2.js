
exports.up = function(knex, Promise) {
  console.log('create emailId field to brews table')

  return knex.schema.createTableIfNotExists('brews', function(table){
    table.string('emailId');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('brews').then(function(){
    console.log('emailId field in brews table was droppped')

  })

};
