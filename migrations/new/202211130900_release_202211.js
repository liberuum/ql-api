// Up migration creates BudgetStatementComment Table 

import knex from "knex";

export async function up(knex) {

    //Add the CoreUnit.legacyBudgetStatementUrl attribute to the Budget Statment table
    console.log("Adding the CoreUnit.legacyBudgetStatementUrl attribute...");
    await knex.schema.alterTable('CoreUnit', function (table) {
        table.string('legacyBudgetStatementUrl');
    })

    //Add System to the Role table
    console.log("Adding the Role.system attribute...");
    await knex.schema.alterTable('Role', function (table) {
    table.boolean('system');
    })

    //Add active attribute the Core Unit table
    console.log("Adding the User.active attribute...")
    await knex.schema.alterTable('User', function (table) {
    table.boolean('active');
    })

    //Add the Auditor Role to the Auditor Table
    console.log("Adding the Auditor value to the Role table..")
   knex.insert({
        roleName: 'Auditor'
    }).into('Role');

    //Add the CoreUnit/Audit permission to the RolePermission table
    console.log("Adding the CoreUnit/Audit value to the RolePermission table..")
    knex.insert({
        roleId: 2,
        resource: 'CoreUnit',
        permission: 'Audit'
    }).into('RolePermission');


    };
    

// Down migration drops the ..... tables
export async function down(knex) {

    console.log('Deleting Auditor role...');

    knex('Role')
    .where({ roleName: 'Auditor' })
    .del();

    console.log('Deleting Audit permission...');

    knex('RolePermission')
    .where({ permission: 'Audit' })
    .del();

    console.log('Deleting User.active attribute...');

    await knex.schema.alterTable('User', function (table) {
        table.dropColumn('active');
      });
    
    console.log('Deleting Role.system attribute...');

    await knex.schema.alterTable('Role', function (table) {
        table.dropColumn('system');
      });

    console.log('Deleting CoreUnit.legacyBudgetStatementUrl attribute...')

    await knex.schema.alterTable('CoreUnit', function (table) {
        table.dropColumn('legacyBudgetStatementUrl');
      });
    
};