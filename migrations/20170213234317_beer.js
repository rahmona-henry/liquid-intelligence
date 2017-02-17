
exports.up = function(knex, Promise) {
  console.log('create beer')

  return knex.schema.createTableIfNotExists('beer', function(table){
    table.increments('id');
    table.string('emailId');
    table.string('brewName');
    table.string('brewStyle');
    table.string('brewer');
    table.string('brewDate');
    table.string('malts');
    table.string('hops');
    table.string('yeast');
    table.string('strikeVolume');
    table.string('mashTemperature');
    table.string('mashTime');
    table.string('spargeWater');
    table.string('spargeTemperature');
    table.string('boilVolume');
    table.string('boilTime');
    table.integer('original');
    table.string('fermentTemperature');
    table.string('fermentTime');
    table.integer('final');
    table.string('dextroseDosage');
    table.string('batchSize');
    table.integer('abv');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('beer').then(function(){
    console.log('beer was dropped')
  })

};
