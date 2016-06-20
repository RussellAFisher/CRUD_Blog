exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del().then(function() {
        return Promise.all([
            knex('users').insert({
                name: 'Russell'
            }),
            knex('users').insert({
                name: 'Batman'
            }),
            knex('users').insert({
                name: 'Doctor Who'
            })
        ]);
    });
};
