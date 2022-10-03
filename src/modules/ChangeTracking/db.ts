import { Knex } from "knex";

export interface ChangeTrackingEvent {
    id: string;
    created_at: string;
    event: string;
    params: object;
    description: string;
}

export class ChangeTrackingModel {
    knex: Knex;
    coreUnitModel: object;

    constructor(knex: Knex, coreUnitModel: object) {
        this.knex = knex;
        this.coreUnitModel = coreUnitModel;
    }

    async getActivityFeed(): Promise<ChangeTrackingEvent[]> {
        return await this.knex.select('*')
            .from('ChangeTrackingEvents')
            .orderBy('id', 'desc');
    }

    async getCoreUnitActivityFeed(cuId: string): Promise<ChangeTrackingEvent[]> {
        return await this.knex('ChangeTrackingEvents_CoreUnits')
            .where('coreunit_id', cuId)
            .orderBy('event_id', 'desc')
            .join('ChangeTrackingEvents', 'ChangeTrackingEvents_CoreUnits.event_id', '=', 'ChangeTrackingEvents.id');
    }

    async getCoreUnitLastActivity(cuId: string): Promise<ChangeTrackingEvent | null> {
        /*
        ToDo
        Improve query to return latest row with knex
        */
        const result = await this.knex('ChangeTrackingEvents_CoreUnits')
            .where('coreunit_id', cuId)
            .orderBy('event_id', 'desc')
            .join('ChangeTrackingEvents', 'ChangeTrackingEvents_CoreUnits.event_id', '=', 'ChangeTrackingEvents.id');
        return result[0]
    }

    async coreUnitBudgetStatementCreated(cuId: string, cuCode: string, cuShortCode: string, budgetStatementId: string, month: string) {
        const monthDate = new Date(month);
        const event = {
            created_at: new Date().toISOString(),
            event: 'CU_BUDGET_STATEMENT_CREATED',
            params: JSON.stringify({ coreUnit: { id: cuId, code: cuCode, shortCode: cuShortCode }, budgetStatementId, month }),
            description: `Core Unit ${cuShortCode} has published a new expense report for ${monthDate.toLocaleString('default', { month: 'long' })} ${monthDate.getFullYear()}`
        }

        const result = await this.knex('ChangeTrackingEvents').insert({ created_at: event.created_at, event: event.event, params: event.params, description: event.description }).returning('*')
        await this.knex('ChangeTrackingEvents_CoreUnits').insert({ event_id: result[0].id, coreunit_id: cuId })
    }

    async coreUnitBudgetStatementUpdated(cuId: string, cuCode: string, cuShortCode: string, budgetStatementId: string, month: string) {
        const monthDate = new Date(month);
        const event = {
            created_at: new Date().toISOString(),
            event: 'CU_BUDGET_STATEMENT_UPDATED',
            params: JSON.stringify({ coreUnit: { id: cuId, code: cuCode, shortCode: cuShortCode }, budgetStatementId, month: monthDate.toISOString().slice(0, 7) }),
            description: `Core Unit ${cuShortCode} has updated their expense report for ${monthDate.toLocaleString('default', { month: 'long' })} ${monthDate.getFullYear()}`
        }

        const result = await this.knex('ChangeTrackingEvents').insert({ created_at: event.created_at, event: event.event, params: event.params, description: event.description }).returning('*')
        await this.knex('ChangeTrackingEvents_CoreUnits').insert({ event_id: result[0].id, coreunit_id: cuId })
    }
}

export default (knex: Knex, deps: { [key: string]: object }) => new ChangeTrackingModel(knex, deps['CoreUnit']);