// Up migration creates BudgetStatementComment Table 

import knex from "knex";

export async function up(knex) {

    //Add the CoreUnit.legacyBudgetStatementUrl attribute to the Budget Statment table
    await knex.schema.alterTable('CoreUnit', function (table) {
        table.string('legacyBudgetStatementUrl');
      })

    await knex.schema.alterTable('Role', function (table) {
    table.boolean('system');
    })

    //Add the Auditor Role to the Auditor Table
   knex.insert({
        roleName: 'Auditor'
    }).into('Role');

    //Add the CoreUnit/Audit permission to the RolePermission table
    knex.insert({
        roleId: 2,
        resource: 'CoreUnit',
        Permission: 'Audit'
    }).into('RolePermission');


    };
    

// Down migration drops the ..... tables
export async function down(knex) {

    console.log('Deleting Auditor role...')

    knex('Role')
    .where({ roleName: 'Auditor' })
    .del()

    console.log('Deleting Role.system attribute...')

    await knex.schema.alterTable('Role', function (table) {
        table.dropColumn('system');
      })

    console.log('Deleting CoreUnit.legacyBudgetStatementUrl attribute...')

    await knex.schema.alterTable('CoreUnit', function (table) {
        table.dropColumn('legacyBudgetSatementUrl');
      })
    
};