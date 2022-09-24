//Creation of the BudgetStatement subtables

 export function up(knex) {
    return knex.schema

    .createTable('AuditReport', function (table) {
        console.log("Creating AuditReport table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.specificType('AuditStatus', 'text').defaultTo(knex.raw('\'{Approved,ApprovedWithComments,NeedAcionsBeforeApproval,Escalated}\'::text')).notNullable(),
        table.timestamp('timestamp').notNullable();
       })

    .createTable('BudgetStatementFtes', function (table) {
        console.log("Creating BudgetStatementFtes table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.date('month').notNullable();
        table.float('ftes').notNullable();
       })

       .createTable('BudgetStatementMkrVest', function (table) {
        console.log("Creating BudgetStatementMkrVest table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.date('vestingDate').notNullable();
        table.float('mkrAmount');
        table.float('mkrAmountOld');
        table.varchar('comments');
       })

       .createTable('BudgetStatementWallet', function (table) {
        console.log("Creating BudgetStatementWallet table...");
        table.increments('id').primary();
        table.integer('budgetStatementId').notNullable();
        table.foreign('budgetStatementId').references('BudgetStatement.id').onDelete('CASCADE');
        table.varchar('name').notNullable();
        table.varchar('address').notNullable();
        table.float('currentBalance');
        table.float('topupTransfer');
        table.varchar('comments');
       })

       .createTable('BudgetStatementLineItem', function (table) {
        console.log("Creating BudgetStatementLineItem table...");
        table.increments('id').primary();
        table.integer('budgetStatementWalletId').notNullable();
        table.foreign('budgetStatementWalletId').references('BudgetStatementWallet.id').onDelete('CASCADE');
        table.date('month').notNullable();
        table.integer('position');
        table.varchar('group');
        table.varchar('budgetCategory').notNullable();
        table.specificType('canonicalBudgetCategory', 'text').defaultTo(knex.raw('\'{CompensationAndBenefits,Bonus,TravelAndEntertainment,TrainingExpense,AdminExpense,CommunityDevelopmentExpense,FreightAndDuties,GasExpense,GovernancePrograms,HardwareExpense,MarketingExpense,ProfessionalServices,SoftwareDevelopmentExpense,SoftwareExpense,Supplies,ContingencyBuffer}\'::text')),
        table.float('forecast');
        table.float('actual');
        table.float('payment');
        table.float('budgetCap');
        table.boolean('headcountExpense').notNullable();
        table.varchar('comments');
       })

       .createTable('BudgetStatementPayment', function (table) {
        console.log("Creating BudgetStatementPayment table...");
        table.increments('id').primary();
        table.integer('budgetStatementWalletId').notNullable();
        table.foreign('budgetStatementWalletId').references('BudgetStatementWallet.id').onDelete('CASCADE');
        table.date('transactionDate').notNullable();
        table.varchar('transactionId').notNullable();
        table.integer('budgetStatementLineItemId');
        table.foreign('budgetStatementLineItemId').references('BudgetStatementLineItem.id').onDelete('CASCADE');
        table.varchar('comments');
       })

       .createTable('BudgetStatementTransferRequest', function (table) {
        console.log("Creating BudgetStatementTransferRequest table...");
        table.increments('id').primary();
        table.integer('budgetStatementWalletId').notNullable();
        table.foreign('budgetStatementWalletId').references('BudgetStatementWallet.id').onDelete('CASCADE');
        table.integer('budgetStatementPaymentId');
        table.foreign('budgetStatementPaymentId').references('BudgetStatementLineItem.id').onDelete('CASCADE');
        table.float('requestAmount').notNullable();
        table.varchar('comments');
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
    .dropTable("AuditReport")
};
