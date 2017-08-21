
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'pass1', email: 'user1@gmail.com'},
        {username: 'user2', password: 'pass2', email: 'user2@gmail.com'},
        {username: 'user3', password: 'pass3', email: 'user3@gmail.com'},
        {username: 'user4', password: 'pass4', email: 'user4@gmail.com'}
      ]);
    });
};
