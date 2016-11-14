
exports.up = function(knex, Promise) {
  console.log('create brewtable')

  return knex.schema.createTableIfNotExists('brewtable', function(table){
    table.increments('id');
    table.string('emailId');
    table.string('brewName');
    table.string('brewer');
    table.string('brewStyle');
    table.integer('abv');
    table.integer('batchNumber');
    table.integer('batchSize');
    table.date('brewDate');
    table.date('bottlingDate');
    table.string('maltType');
    table.string('hopType');
    table.string('yeastType')
    table.string('strikeWater')
    table.string('mashTime');
    table.string('spargeWater')
    table.string('boilTime');
    table.string('primingSugar')
    table.integer('originalGravity');
    table.integer('finalGravity');
    table.string('fermentation');
    table.string('conditioning');
    table.string('tastingNotes');


  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('brewtable').then(function(){
    console.log('brewtable was droppped')

  })

};
