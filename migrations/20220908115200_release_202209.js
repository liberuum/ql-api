
export function up(knex) {
    return knex.schema
    
    .alterTable('users', function (table) {
        table.string('twitter_handle', 150).unique({indexName:'user_unique_twitter'});
    })

    .createTable('accounts', function (table) {
        console.log("Creating accounts table with username!...");
        table.increments('id');
        table.string('username', 60).notNullable();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
    });
}

export function down(knex) {
    
    console.log("Dropping table accounts...");

    return knex.schema
    .dropTable("accounts")
    .alterTable("users", function(table){
        table.dropColumn("twitter_handle");
    });
}