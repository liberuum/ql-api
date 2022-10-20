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

it('returns a change tracking event as last activity of a core unit', async () => {
    const model = await getChangeTrackingModel();
    const entry = await model.getCoreUnitLastActivity('39');

    expect(entry?.event).toMatch(/CU_BUDGET_STATEMENT/);
});

it('returns a string ID for Core Unit-related events', async () => {
    const model = await getChangeTrackingModel();
    const entry = await model.getCoreUnitLastActivity('39');

    expect(entry?.event).toMatch(/CU_BUDGET_STATEMENT/);
    expect(typeof (entry?.params as any).coreUnit.id).toBe('number');
});