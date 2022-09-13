//Up migration creates Core Unit and all root tables

export function up(knex) {
    return knex.schema
    
    .createTable('CoreUnit', function (table) {
        console.log("Creating Core Unit table...");
        table.increments('id').primary();
        table.string('code', 255).notNullable();
        table.string('shortCode', 255).notNullable();
        table.string('name', 255).notNullable();
        table.string('image', 255).notNullable();
        table.specificType('category', 'text[]').defaultTo(knex.raw('\'{Technical,Operational,Business,RWAs,Growth,Finance,Legal}\'::text[]')).notNullable(),
        table.string('sentenceDescription', 255);
        table.string('paragraphDescription', 255);
        table.string('paragraphImage', 255);
    })

    .createTable('CuMip', function (table) {
        console.log("Creating Core Unit  MIP table...");
        table.increments('id').primary();
        table.integer('cuId').notNullable();
        table.foreign('cuId').references('CoreUnit.id').onDelete('CASCADE')
        table.string('mipCode', 255).notNullable();
        table.string('mipTitle', 255).notNullable();
        table.date('rfc', 255);
        table.date('formalSubmission', 255);
        table.date('accepted', 255);
        table.date('rejected', 255);
        table.date('obsolete', 255);
        table.specificType('status', 'text').defaultTo(knex.raw('\'{RFC,FormalSubmission,Accepted,Rejected,Obsolete,Withdrawn}\'::text')).notNullable(),
        table.string('mipUrl', 255);
        table.string('forumUrl', 255);
    })

    .createTable('BudgetStatement', function (table) {
        console.log("Creating BudgetStatement table...");
        table.increments('id').primary();
        table.integer('cuId').notNullable();
        table.foreign('cuId').references('CoreUnit.id').onDelete('CASCADE')
        table.string('cuCode', 255).notNullable();
        table.date('month', 255).notNullable();
        table.string('comments', 255);
        table.specificType('budgetStatus', 'text').defaultTo(knex.raw('\'{Draft,SubmittedToAuditor,AwaitingCorrections,Final}\'::text')).notNullable(),
        table.string('publicationUrl', 255);
        table.float('mkrProgramLength', 255);
    })

    .createTable('SocialMediaChannels', function (table) {
        console.log("Creating SocialMediaChannel table...");
        table.increments('id').primary();
        table.integer('cuId').notNullable();
        table.foreign('cuId').references('CoreUnit.id').onDelete('CASCADE')
        table.string('forumTag', 255);
        table.string('twitter', 255);
        table.string('youtube', 255);
        table.string('discord', 255);
        table.string('linkedin', 255);
        table.string('website', 255);
        table.string('github', 255);
    })

    .createTable('Contributor', function (table) {
        console.log("Creating Contributor table...");
        table.increments('id').primary();
        table.string('name', 255);
        table.string('forumHandle', 255).notNullable();
        table.string('discordHandle', 255).notNullable();
        table.string('twitterHandle', 255);
        table.string('email', 255);
        table.string('githubUrl', 255);
        table.string('facilitatorImage', 255);
    })

    .createTable('ContributorCommitment', function (table) {
        console.log("Creating ContributorCommitment table...");
        table.increments('id').primary();
        table.integer('cuId').notNullable();
        table.foreign('cuId').references('CoreUnit.id').onDelete('CASCADE')
        table.integer('contributorId').notNullable();
        table.foreign('contributorId').references('Contributor.id').onDelete('CASCADE')
        table.date('startDate', 255).notNullable();
        table.enu('commitment', ['FullTime','PartTime','Variable','Inactive']).notNullable();
        table.string('title', 255).notNullable();
    })

    .createTable('Roadmap', function (table) {
        console.log("Creating Roadmap table...");
        table.increments('id').primary();
        table.integer('ownerCuId').notNullable();
        table.foreign('ownerCuId').references('CoreUnit.id').onDelete('CASCADE')
        table.varchar('roadmapCode', 255);
        table.varchar('roadmapName', 255).notNullable();
        table.enu('roadmapStatus', ['ToDo','InProgress','Done']).notNullable();
        table.varchar('roadmapSummary', 255);
        table.boolean('strategicInitiative');
        table.string('comments', 255);
    })

    .createTable('CuUpdate', function (table) {
        console.log("Creating CuUpdate table...");
        table.increments('id').primary();
        table.integer('cuId').notNullable();
        table.foreign('cuId').references('CoreUnit.id').onDelete('CASCADE')
        table.varchar('updateTitle', 255).notNullable();
        table.date('updateDate', 255).notNullable();
        table.varchar('updateUrl', 255).notNullable();
    })
}

//Down migration deletes Core Unit and all root tables

export function down(knex) {
    
    console.log("Dropping tables CoreUnit, CuMip, BudgetStatement, SocialMediaChannels, Contributor, ContributorCommitment, Roadmap...");

    return knex.schema

    .dropTable("CuUpdate")
    .dropTable("Roadmap")
    .dropTable("ContributorCommitment")
    .dropTable("Contributor")
    .dropTable("SocialMediaChannels")
    .dropTable("BudgetStatement")
    .dropTable("CuMip")
    .dropTable("CoreUnit")
      
}