exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments();
    table.string('comment_text');
    table.integer('comment_author_id');
    table.integer('original_post_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
