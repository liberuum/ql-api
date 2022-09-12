/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('CoreUnit').delete()
  await knex('CoreUnit').insert([
    {code: 'EXA-001'},
    //{shortCode: 'EXAMPLE'},
    {name: 'Example'},
    {image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/03/02/11/screen-shot-2018-03-02-at-12.23.53.png?quality=75&width=982&height=726&auto=webp'},
    {category: 'Technical'},
    {sentenceDescription: 'This core unit is an example entry'},
    {paragraphDescription: 'The core unit does example activities such as building examples'},
    {paragraphImage: 'https://www.wikihow.com/Write-a-Paragraph'},
    ]);
}
