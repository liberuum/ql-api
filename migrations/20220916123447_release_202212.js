//Creation of the independent tables

export function up(knex) {
    return knex.schema

    .createTable('ViewDataCache', function (table) {
        console.log("Creating ViewDataCache table...");
        table.varchar('key').primary().notNullable();
        table.timestamp('lastUpdate').notNullable();
        table.json('value');
       })

       .createTable('BudgetToolVersion', function (table) {
        console.log("Creating BudgetToolVersion table...");
        table.increments('id').primary();
        table.varchar('version').notNullable();
        table.varchar('link').notNullable();
       })

};


export function down(knex) {
    console.log("Dropping tables ViewDataCache and BudgetToolVersion tables...");

    return knex.schema

    .dropTable("BudgetToolVersion") 
    .dropTable("ViewDataCache")

};
