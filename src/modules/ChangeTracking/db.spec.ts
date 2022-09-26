import initApi from "../../initApi";
import { ChangeTrackingModel } from "./db";

const config = {
    ChangeTracking: { enabled: true, require: ['CoreUnit'] },
    CoreUnit: { enabled: true },
};

it('returns a change tracking event as last activity of a core unit', async () => {
    const apiModules = await initApi(config);
    const db = apiModules.datasource;

    const cu = {
        id: 10,
        code: 'EXA=001',
        shortCode: 'EXA'
    };

    const entry = await db.module<ChangeTrackingModel>("ChangeTracking").getCoreUnitLastActivity(cu.id, cu.code, cu.shortCode);

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