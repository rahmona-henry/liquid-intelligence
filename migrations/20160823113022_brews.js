
exports.up = function(knex, Promise) {
  console.log('create table')

  return knex.schema.createTableIfNotExists('brews', function(table){
    table.increments('id');
    table.string('brewName');
    table.string('brewer');
    table.string('brewStyle');
    table.integer('batchNumber');
    table.string('brewIngredients');
    table.string('brewingProcess');
    table.string('brewDate');
    table.string('bottlingDate');
    table.string('mashTime');
    table.string('boilTime');
    table.integer('original');
    table.integer('final');
    table.integer('mashTemperature');
    table.integer('fermentTemperature');
    table.integer('batchSize');
    table.integer('abv');
    table.string('tastingNotes');
    table.string('emailId');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('brews').then(function(){
    console.log('brews table was droppped')

  })

};
