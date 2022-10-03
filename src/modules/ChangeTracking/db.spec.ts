import initApi from "../../initApi";
import { ChangeTrackingModel } from "./db";

async function getChangeTrackingModel():Promise<ChangeTrackingModel> {
    const apiModules = await initApi({
        ChangeTracking: { enabled: true, require: ['CoreUnit'] },
        CoreUnit: { enabled: true },
    });
    const db = apiModules.datasource;
    return db.module<ChangeTrackingModel>("ChangeTracking");
}

const cu = {
    id: '10',
    code: 'EXA-001',
    shortCode: 'EXA'
};

it('returns a change tracking event as last activity of a core unit', async () => {
    const model = await getChangeTrackingModel();
    const entry = await model.getCoreUnitLastActivity(cu.id);

    expect(entry?.event).toEqual('CU_BUDGET_STATEMENT_CREATE');
    expect(entry?.params).toEqual({
        budgetStatementId: 123,
        month: '2022-09',
        coreUnit: {
            id: cu.id,
            code: cu.code,
            shortCode: cu.shortCode
        }
    });
});

it('returns a string ID for Core Unit-related events', async () => {
    const model = await getChangeTrackingModel();
    const entry = await model.getCoreUnitLastActivity(cu.id);

    expect(entry?.event).toEqual('CU_BUDGET_STATEMENT_CREATE');
    expect(typeof (entry?.params as any).coreUnit.id).toBe('string');
});