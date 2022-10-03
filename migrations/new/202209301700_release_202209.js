//Up migration creates 
export async function up(knex) {
    const data = await knex.select('id', 'cuId', 'month', 'cuCode')
        .from('BudgetStatement')

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    var today = new Date()

    console.log('Creating ' + data.length + ' change tracking events for existing budget statements...')

    for (let i = 0; i < data.length; i++) {
        if (data[i].month < today) {
            await knex.insert({
                created_at: data[i].month,
                event: 'CU_BUDGET_STATEMENT_CREATE',
                params: {
                    coreUnit: {
                        id: data[i].cuId,
                        code: data[i].cuCode,
                        shortCode: data[i].cuCode.slice(0, -4)
                    },
                    budgetStatementId: data[i].id,
                    month: data[i].month.toISOString().slice(0, 7)
                },
                description: 'Core Unit ' + data[i].cuCode + ' submitted a new budget statement for ' + months[data[i].month.getMonth()] + ' ' + data[i].month.getFullYear()
            }).into('ChangeTrackingEvents')
        }
    }
};

//Down migration deletes all change tracking events
export function down(knex) {

    console.log('Deleting all change tracking events for existing budget statements...')

    return knex('ChangeTrackingEvents').del()

};