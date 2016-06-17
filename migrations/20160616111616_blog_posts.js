exports.up = function(knex, Promise) {
    return knex.schema.createTable('blog_posts', function(table) {
        table.increments('id');
        table.string('title');
        table.date('date');
        table.string('users_name').references('users.name');
        table.text('body');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('blog_posts');
};
