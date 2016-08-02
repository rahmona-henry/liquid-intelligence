
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, email: 'rahmona.henry@icloud.com', hashed_password:'xxxxxxxxxx'}),
        knex('users').insert({id: 2, email: 'cara.rooney@icloud.com', hashed_password:'yyyyyyyyyy'}),
        knex('users').insert({id: 3, email: 'bun.oven@icloud.com', hashed_password:'zzzzzzzzzzzz'})
      ]);
    });
};
