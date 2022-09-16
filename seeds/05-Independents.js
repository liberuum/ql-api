/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('ViewDataCache').del()
  await knex('BudgetToolVersion').del()

  await knex('ViewDataCache').insert([
    {name: 'Colonel Sanders', stakeholderContributorId: 1, stakeholderCuId: 2},
    {name: 'Example', stakeholderContributorId: 2, stakeholderCuId: 1}
  ]);

  await knex('BudgetToolVersion').insert([
    {stakeholderRoleName: 'Captain of the Ship'},
    {stakeholderRoleName: 'Facilitator'}
  ]);

};
