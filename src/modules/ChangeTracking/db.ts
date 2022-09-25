import { Knex } from "knex";

let fakeId = 1;
const eventMock = (cuId:number, cuCode:string, cuShortCode:string): ChangeTrackingEvent => ({
    id: fakeId++, 
    datetime:'2022-09-25T17:55:00', 
    event:'CU_BUDGET_STATEMENT_CREATE', 
    params: {coreUnit: {id: cuId, code: cuCode, shortCode: cuShortCode}, budgetStatementId: 123, month: '2022-09'},
    description: `Core Unit ${cuShortCode} submitted a new budget statement for 2022-09`
});

export interface ChangeTrackingEvent {
    id: number;
    datetime: string;
    event: string;
    params: object;
    description: string;
}

class ChangeTrackingModel {
    knex: Knex;
    coreUnitModel: object;

    constructor(knex: Knex, coreUnitModel: object) {
        this.knex = knex;
        this.coreUnitModel = coreUnitModel;
    }

    async getActivityFeed(): Promise<ChangeTrackingEvent[]> {
        return [
            eventMock(5, "GOV-001", "GOV"),
            eventMock(9, "CES-001", "CES"),
            eventMock(5, "GOV-001", "GOV"),
        ];
    }

    async getCoreUnitActivityFeed(cuId:number, cuCode:string, cuShortCode:string): Promise<ChangeTrackingEvent[]> {
        return [
            eventMock(cuId, cuCode, cuShortCode),
            eventMock(cuId, cuCode, cuShortCode),
            eventMock(cuId, cuCode, cuShortCode),
         ];
    }

    async getCoreUnitLastActivity(cuId:number, cuCode:string, cuShortCode:string): Promise<ChangeTrackingEvent|null> {
        return eventMock(cuId, cuCode, cuShortCode);
    }
}

export default (knex: Knex, deps: {[key:string]: object}) => new ChangeTrackingModel(knex, deps['CoreUnit']);