/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export async function seed(knex) {
    // Deletes ALL existing entries
    await knex('BudgetStatementComment_BudgetStatementCommentAuthor').delete()
    await knex('BudgetStatementComment').delete()
    await knex('BudgetStatementCommentAuthor').delete()
    
    await knex('BudgetStatementComment').insert([{
        budgetStatementId: 397,
        timestamp: "2022-10-10T11:52:42.879Z",
        comment: "Expenses for this month overran due to increased costs of goods sold"
      },
      {
        budgetStatementId: 396,
        timestamp: "2022-10-25T11:52:42.879Z",
        comment: "We accurately forecasted expenses this month thanks to our new reporting tool" 
      },
      {
        budgetStatementId: 395,
        timestamp: "2022-08-04T11:52:42.879Z",
        comment: "The expenses for this month included a big outflow for purchase of high tech security software" 
      },
      {
        budgetStatementId: 394,
        timestamp: "2022-09-01T11:52:42.879Z",
        comment: "The office party and huge merch order sent us over budget this month" 
      }
    ])

    await knex('BudgetStatementCommentAuthor').insert([{
        name: "EXA",
      },
      {
        name: "EXA",
      },
      {
        name: "EXA",
      },
      {
        name: "EXA",
      }
    ])

    const dataComment = await knex
        .select('id')
        .from('BudgetStatementComment')
        .orderBy('id');

    const dataAuthor = await knex
        .select('id')
        .from('BudgetStatementCommentAuthor')
        .orderBy('id');


    await knex('BudgetStatementComment_BudgetStatementCommentAuthor').insert([{
        bsCommentId: dataComment[0].id,
        bsCommentAuthorId: dataAuthor[0].id
      },
      {
        bsCommentId: dataComment[0].id,
        bsCommentAuthorId: dataAuthor[0].id
      }
    ])
  
    
  };