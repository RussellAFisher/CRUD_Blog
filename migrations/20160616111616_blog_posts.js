exports.up = function(knex, Promise) {
    return knex.schema.createTable('blog_posts', function(table) {
        table.increments('id');
        table.string('title');
        table.timestamp('date').defaultTo(knex.fn.now());
        table.string('users_name').references('users.name').onDelete('cascade');
        table.text('body');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('blog_posts');
};
