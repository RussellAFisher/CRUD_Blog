exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.string('name').unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
