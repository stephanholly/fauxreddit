
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {comment_text: 'blah blah blah', comment_author_id: 1, original_post_id: 2},
        {comment_text: 'blah blah blah', comment_author_id: 2, original_post_id: 3},
        {comment_text: 'blah blah blah', comment_author_id: 3, original_post_id: 2},
        {comment_text: 'blah blah blah', comment_author_id: 4, original_post_id: 1}
      ]);
    });
};
