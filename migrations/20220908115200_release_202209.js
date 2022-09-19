//Up migration creates CuMip and subtables

export function up(knex) {
    return knex.schema
    
    .createTable('MipReplaces', function (table) {
        console.log("Creating MipReplaces table...");
        table.increments('id').primary();
        table.integer('newMipId').notNullable();
        table.foreign('newMipId').references('CuMip.id').onDelete('CASCADE');
        table.integer('replacedMipId').notNullable();
        table.foreign('replacedMipId').references('CuMip.id').onDelete('CASCADE');
    })

    .createTable('Mip39', function (table) {
        console.log("Creating Mip39 table...");
        table.increments('id').primary();
        table.integer('cuMipId').notNullable();
        table.foreign('cuMipId').references('CuMip.id').onDelete('CASCADE');
        table.integer('mip39Spn').notNullable();
        table.string('cuName').notNullable();  
        table.string('sentenceSummary').notNullable();     
        table.string('paragraphSummary').notNullable();     
    })

    .createTable('Mip40', function (table) {
        console.log("Creating Mip40 table...");
        table.increments('id').primary();
        table.integer('cuMipId').notNullable();
        table.foreign('cuMipId').references('CuMip.id').onDelete('CASCADE');
        table.varchar('mip40Spn').notNullable();
        table.boolean('mkrOnly').notNullable();  
        table.float('mkrProgramLength').notNullable();     
    })

    .createTable('Mip40BudgetPeriod', function (table) {
        console.log("Creating Mip40BudgetPeriod table...");
        table.increments('id').primary();
        table.integer('mip40Id').notNullable();
        table.foreign('mip40Id').references('Mip40.id').onDelete('CASCADE');
        table.date('budgetPeriodStart').notNullable()
        table.date('budgetPeriodEnd').notNullable()
        table.float('ftes').notNullable();     
    })

    .createTable('Mip40Wallet', function (table) {
        console.log("Creating Mip40Wallet table...");
        table.increments('id').primary();
        table.integer('mip40Id').notNullable();
        table.foreign('mip40Id').references('Mip40.id').onDelete('CASCADE');
        table.varchar('address').notNullable();
        table.varchar('name').notNullable();  
        table.integer('signersTotal').notNullable();  
        table.integer('signersRequired').notNullable();  
        table.float('clawbackLimit');     
    })

    .createTable('Mip40BudgetLineItem', function (table) {
        console.log("Creating Mip40BudgetLineItem table...");
        table.increments('id').primary();
        table.integer('mip40WalletId').notNullable();
        table.foreign('mip40WalletId').references('Mip40Wallet.id').onDelete('CASCADE');
        table.integer('position');
        table.varchar('group');  
        table.varchar('budgetCategory').notNullable();   
        table.specificType('canonicalBudgetCategory', 'text').defaultTo(knex.raw('\'{CompensationAndBenefits,Bonus,TravelAndEntertainment,TrainingExpense,AdminExpense,CommunityDevelopmentExpense,FreightAndDuties,GasExpense,GovernancePrograms,HardwareExpense,MarketingExpense,ProfessionalServices,SoftwareDevelopmentExpense,SoftwareExpense,Supplies,ContingencyBuffer}\'::text')),
        table.float('budgetCap').notNullable();  
        table.boolean('headcountExpense').notNullable()   
    })

    .createTable('Mip41', function (table) {
        console.log("Creating Mip41 table...");
        table.increments('id').primary();
        table.integer('cuMipId').notNullable();
        table.foreign('cuMipId').references('CuMip.id').onDelete('CASCADE');
        table.integer('contributorId').notNullable();
        table.foreign('contributorId').references('Contributor.id').onDelete('CASCADE');
    })

}


export function down(knex) {
    
    console.log("Dropping tables CuMip subtables...");

    return knex.schema

    .dropTable("Mip41")
    .dropTable("Mip40BudgetLineItem")
    .dropTable("Mip40Wallet")
    .dropTable("Mip40BudgetPeriod")
    .dropTable("Mip40")
    .dropTable("Mip39")
    .dropTable("MipReplaces") 

}