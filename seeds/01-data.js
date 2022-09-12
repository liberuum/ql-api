/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('CoreUnit').delete()
  await knex('CuMip').delete()
  await knex('BudgetStatement').delete()
  await knex('SocialMediaChannels').delete()
  await knex('Contributor').delete()
  await knex('ContributorCommitment').delete()
  await knex('Roadmap').delete()
  await knex('CuUpdate').delete()

  await knex('CoreUnit').insert([
    {
      code: 'EXA-001',
      shortCode: 'EXA',
      name: 'Example',
      image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/02/11/screen-shot-2018-03-02-at-12.23.53.png?quality=75&width=982&height=726&auto=webp',
      category: 'Technical',
      sentenceDescription: 'This core unit is an example entry',
      paragraphDescription: 'The core unit does example activities such as building examples',
      paragraphImage: 'https://www.wikihow.com/Write-a-Paragraph',
  }])

  await knex('CuMip').insert([
    {
      cuId: knex('CoreUnit').pluck('id'),
      mipCode: 'MIP39c2SP1',
      mipTitle: 'Adding RWF Core Unit',
      rfc: '08-07-2022',
      mipStatus: 'RFC',
      mipUrl: 'https://mips.makerdao.com/mips/details/MIP39c2SP1',
      forumUrl: 'https://forum.makerdao.com/t/mip39c2-sp1-adding-core-unit-real-world-finance/6224'
  }])

  };
