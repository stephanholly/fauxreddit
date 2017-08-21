
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {title: 'blah', text: 'blerg blerg blerg blerg blerg blerg', author_id: 1},
        {title: 'blah', text: 'blerg blerg blerg blerg blerg blerg', author_id: 2},
        {title: 'blah', text: 'blerg blerg blerg blerg blerg blerg', author_id: 3},
        {title: 'blah', text: 'blerg blerg blerg blerg blerg blerg', author_id: 4}
      ]);
    });
};
