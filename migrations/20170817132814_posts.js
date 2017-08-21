exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments();
    table.string('title');
    table.string('text');
    table.integer('author_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
