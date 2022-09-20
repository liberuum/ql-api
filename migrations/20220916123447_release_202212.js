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

       .createTable('User', function (table) {
        console.log("Creating User table...");
        table.increments('id').primary();
        table.varchar('username').notNullable();
        table.varchar('password').notNullable();
       })

       .createTable('Role', function (table) {
        console.log("Creating Role table...");
        table.increments('id').primary();
        table.varchar('roleName').notNullable();
       })

       .createTable('UserRole', function (table) {
        console.log("Creating UserRole table...");
        table.increments('id').primary();
        table.integer('roleId').notNullable();
        table.foreign('roleId').references('Role.id').onDelete('CASCADE')
        table.integer('userId').notNullable();
        table.foreign('userId').references('User.id').onDelete('CASCADE')
        table.specificType('resource', 'text').defaultTo(knex.raw('\'{System,CoreUnit}\'::text')).notNullable();
        table.integer('resourceId').notNullable();
       })

       .createTable('RolePermission', function (table) {
        console.log("Creating RolePermission table...");
        table.increments('id').primary();
        table.integer('roleId').notNullable();
        table.foreign('roleId').references('Role.id').onDelete('CASCADE')
        table.specificType('permission', 'text').defaultTo(knex.raw('\'{Create,Update,Delete,Audit,Manage}\'::text')).notNullable();
        table.integer('resourceId').notNullable();
       })

};


export function down(knex) {
    console.log("Dropping tables ViewDataCache and BudgetToolVersion tables...");

    return knex.schema

    .dropTable("RolePermission") 
    .dropTable("Role") 
    .dropTable("UserRole") 
    .dropTable("User") 
    .dropTable("BudgetToolVersion") 
    .dropTable("ViewDataCache")

};
