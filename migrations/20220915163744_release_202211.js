//Creation of the Roadmap subtables

export function up(knex) {
    return knex.schema

    .createTable('Stakeholder', function (table) {
        console.log("Creating Stakeholder table...");
        table.increments('id').primary();
        table.varchar('name').notNullable();
        table.integer('stakeholderContributorId').notNullable();
        table.foreign('stakeholderContributorId').references('Contributor.id').onDelete('CASCADE');
        table.integer('stakeholderCuId').notNullable();
        table.foreign('stakeholderCuId').references('CoreUnit.id').onDelete('CASCADE');
       })

       .createTable('StakeholderRole', function (table) {
        console.log("Creating StakeholderRole table...");
        table.increments('id').primary();
        table.varchar('stakeholderRoleName', 255).notNullable();
       })

       .createTable('RoadmapStakeholder', function (table) {
        console.log("Creating RoadmapStakeholder table...");
        table.increments('id').primary();
        table.integer('stakeholderId').notNullable();
        table.foreign('stakeholderId').references('Stakeholder.id').onDelete('CASCADE');
        table.integer('roadmapId').notNullable();
        table.foreign('roadmapId').references('Roadmap.id').onDelete('CASCADE');
        table.integer('stakeholderRoleId').notNullable();
        table.foreign('stakeholderRoleId').references('StakeholderRole.id').onDelete('CASCADE');
       })

       .createTable('Output', function (table) {
        console.log("Creating Output table...");
        table.increments('id').primary();
        table.varchar('name', 255).notNullable();
        table.varchar('outputUrl', 255).notNullable();
        table.date('outputDate').notNullable();
       })

       .createTable('OutputType', function (table) {
        console.log("Creating OutputType table...");
        table.increments('id').primary();
        table.varchar('outputType', 255).notNullable(); 
       })

       .createTable('RoadmapOutput', function (table) {
        console.log("Creating RoadmapOutput table...");
        table.increments('id').primary();
        table.integer('outputId').notNullable();
        table.foreign('outputId').references('Output.id').onDelete('CASCADE');
        table.integer('outputTypeId').notNullable();
        table.foreign('outputTypeId').references('OutputType.id').onDelete('CASCADE');
       })

       .createTable('Task', function (table) {
        console.log("Creating Task table...");
        table.increments('id').primary();
        table.integer('parentId').notNullable();
        table.foreign('parentId').references('Task.id').onDelete('CASCADE');
        table.varchar('taskName', 255).notNullable(); 
        table.specificType('taskStatus', 'text').defaultTo(knex.raw('\'{Backlog,ToDo,InProgress,Done,WontDo,Blocked}\'::text')).notNullable();
        table.integer('ownerStakeholderId');
        table.foreign('ownerStakeholderId').references('Stakeholder.id').onDelete('CASCADE');
        table.date('startDate');
        table.integer('position').notNullable();
        table.date('target');
        table.float('completedPercentage');
        table.specificType('confidenceLevel', 'text').defaultTo(knex.raw('\'{High,Medium,Low}\'::text')).notNullable();
        table.varchar('comments', 255);
       })

       .createTable('Review', function (table) {
        console.log("Creating Review table...");
        table.increments('id').primary();
        table.integer('taskId').notNullable();
        table.foreign('taskId').references('Task.id').onDelete('CASCADE');
        table.date('reviewDate').notNullable();
        table.specificType('reviewOutcome', 'text').defaultTo(knex.raw('\'{Red,Yellow,Green}\'::text')).notNullable();
        table.varchar('comments', 255);
       })

       .createTable('Milestone', function (table) {
        console.log("Creating Milestone table...");
        table.increments('id').primary();
        table.integer('roadmapId').notNullable();
        table.foreign('roadmapId').references('Roadmap.id').onDelete('CASCADE');
        table.integer('taskId').notNullable();
        table.foreign('taskId').references('Task.id').onDelete('CASCADE');
       })


};


export function down(knex) {
    console.log("Dropping tables Roadmap subtables...");

    return knex.schema

    .dropTable("Milestone") 
    .dropTable("Review")
    .dropTable("Task")
    .dropTable("RoadmapOutput")
    .dropTable("OutputType")
    .dropTable("Output") 
    .dropTable("RoadmapStakeholder")
    .dropTable("StakeholderRole")
    .dropTable("Stakeholder")

};
