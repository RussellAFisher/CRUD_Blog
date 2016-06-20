exports.up = function(knex, Promise) {
    return knex.schema.createTable('comment', function(table) {
        table.increments('id');
        table.string('users_name').references('users.name').onDelete('cascade');
        table.integer('blog_id').references('blog_posts.id').onDelete('cascade');
        table.text('comment');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comment');
};
