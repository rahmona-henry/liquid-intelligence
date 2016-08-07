
exports.up = function(knex, Promise) {
  console.log('Message table created')

    return knex.schema.createTableIfNotExists('messages', function(table) {
      table.increments('id');
      table.integer('userId')
      table.string('message');
      table.timestamps();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages').then(function() {
    console.log('Messages table was dropped')
  })
};
