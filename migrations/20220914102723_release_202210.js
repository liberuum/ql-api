//Creation of the BudgetStatement subtables

 export function up(knex) {
    return knex.schema

    .createTable('BudgetStatementFtes', function (table) {
        console.log("Creating BudgetStatementFtes table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.date('month', 255).notNullable();
        table.float('ftes', 255).notNullable();
       })

       .createTable('BudgetStatementMkrVest', function (table) {
        console.log("Creating BudgetStatementMkrVest table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.date('vestingDate', 255).notNullable();
        table.float('mkrAmount', 255);
        table.float('mkrAmountOld', 255);
        table.varchar('comments', 255);
       })

       .createTable('BudgetStatementWallet', function (table) {
        console.log("Creating BudgetStatementWallet table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.varchar('name', 255).notNullable();
        table.varchar('address', 255).notNullable();
        table.float('currentBalance', 255);
        table.float('topupTransfer', 255);
        table.varchar('comments', 255);
       })

       .createTable('BudgetStatementLineItem', function (table) {
        console.log("Creating BudgetStatementLineItem table...");
        table.increments('id').primary();
        table.integer('budgetStatementWalletId').notNullable();
        table.foreign('budgetStatementWalletId').references('BudgetStatementWallet.id').onDelete('CASCADE');
        table.date('month', 255).notNullable();
        table.integer('position', 255);
        table.varchar('group', 255);
        table.varchar('budgetCategory', 255).notNullable();
        table.specificType('canonicalBudgetCategory', 'text').defaultTo(knex.raw('\'{CompensationAndBenefits,Bonus,TravelAndEntertainment,TrainingExpense,AdminExpense,CommunityDevelopmentExpense,FreightAndDuties,GasExpense,GovernancePrograms,HardwareExpense,MarketingExpense,ProfessionalServices,SoftwareDevelopmentExpense,SoftwareExpense,Supplies,ContingencyBuffer}\'::text')).notNullable(),
        table.float('forecast');
        table.float('actual');
        table.float('payment');
        table.float('budgetCap');
        table.boolean('headcountExpense');
        table.varchar('comments', 255);
       })

       .createTable('BudgetStatementPayment', function (table) {
        console.log("Creating BudgetStatementPayment table...");
        table.increments('id').primary();
        table.integer('budgetStatementWalletId').notNullable();
        table.foreign('budgetStatementWalletId').references('BudgetStatementWallet.id').onDelete('CASCADE');
        table.date('transactionDate', 255).notNullable();
        table.varchar('transactionId', 255).notNullable();
        table.integer('budgetStatementLineItemId', 255);
        table.foreign('budgetStatementLineItemId').references('BudgetStatementLineItem.id').onDelete('CASCADE');
        table.varchar('comments', 255);
       })

       .createTable('BudgetStatementTransferRequest', function (table) {
        console.log("Creating BudgetStatementTransferRequest table...");
        table.increments('id').primary();
        table.integer('budgetStatementWalletId').notNullable();
        table.foreign('budgetStatementWalletId').references('BudgetStatementWallet.id').onDelete('CASCADE');
        table.integer('budgetStatementPaymentId', 255);
        table.foreign('budgetStatementPaymentId').references('BudgetStatementLineItem.id').onDelete('CASCADE');
        table.float('requestAmount', 255).notNullable();
        table.varchar('comments', 255);
       })


};


export function down(knex) {
    console.log("Dropping tables BudgetStatement subtables...");

    return knex.schema

    .dropTable("BudgetStatementTransferRequest")
    .dropTable("BudgetStatementPayment")
    .dropTable("BudgetStatementLineItem")
    .dropTable("BudgetStatementWallet")
    .dropTable("BudgetStatementMkrVest")
    .dropTable("BudgetStatementFtes") 
};
