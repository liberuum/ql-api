
export function up(knex) {
    return knex.schema
    
    .createTable('users', function (table) {
        console.log("Creating users table...");
        table.increments('id');
        table.string('first_name', 255).notNullable();
        table.string('last_name', 255).notNullable();
    })

    .createTable('products', function (table) {
        console.log("Creating products table...");
        table.increments('id');
        table.decimal('price').notNullable();
        table.string('name', 1000).notNullable();
    });
}

export function down(knex) {
    
    console.log("Dropping tables products and users...");

    return knex.schema
    .dropTable("products")
    .dropTable("users");
}