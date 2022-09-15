/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('MipReplaces').del()
  await knex('Mip39').del()
  await knex('Mip40').del()
  await knex('Mip40BudgetPeriod').del()
  await knex('Mip40Wallet').del()
  await knex('Mip40BudgetLineItem').del()
  await knex('Mip41').del()

  await knex('MipReplaces').insert([
    {id: 1, newMipId: 1, replacedMipId: 2},
    {id: 2, newMipId:2, replacedMipId: 1}
  ]);

  await knex('Mip39').insert([
    {cuMipId: 1, mip39Spn: 32, cuName: 'Example', 
    sentenceSummary: 'This core unit will have the duty of carrying out example tasks',
    paragraphSummary: 'These acitivities will involve doing general example things'},
    {cuMipId: 2, mip39Spn: 12, cuName: 'War',
    sentenceSummary: 'This core unit will have the duty of carrying out example tasks',
    paragraphSummary: 'These acitivities will involve doing general example things'}
  ]);

  await knex('Mip40').insert([
    {cuMipId: 1, mip40Spn: 'MIP40c3SP11', mkrOnly: false, mkrProgramLength: 2.5},
    {cuMipId: 2, mip40Spn: 'MIP40c3SP101', mkrOnly: true, mkrProgramLength: 5}
  ]);

  await knex('Mip40BudgetPeriod').insert([
    {mip40Id: 1, budgetPeriodStart: '01-01-2020', budgetPeriodEnd: '12-31-2022', ftes: 3},
    {mip40Id: 2, budgetPeriodStart: '01-01-2022', budgetPeriodEnd: '06-01-2022', ftes: 10.1}
  ]);

  await knex('Mip40Wallet').insert([
    {mip40Id: 1, address: '0x4862733B5FdDFd35f35ea8CCf08F5045e57388B3', name: 'Permanent Team Wallet', signersTotal: 3, signersRequired: 2},
    {mip40Id: 2, address: '0x4862733B5FdDFd35f35ea8CCf08F5045e57388B3', name: 'The War Chest', signersTotal: 3, signersRequired: 2}
  ]);

};
