import initApi from "../../initApi";

const config = {
    ChangeTracking: { enabled: true, require: ['CoreUnit'] },
    CoreUnit: { enabled: true },
};

it('returns a change tracking event as last activity of a core unit', async () => {
    const apiModules = await initApi(config);
    const db = apiModules.datasource as any;

    const cu = {
        id: 10,
        code: 'EXA=001',
        shortCode: 'EXA'
    };

    const entry = await db.ChangeTracking.getCoreUnitLastActivity(cu.id, cu.code, cu.shortCode);

    expect(entry.event).toBe('CU_BUDGET_STATEMENT_CREATE');
    expect(entry.params.coreUnit).toEqual({
        id: cu.id,
        code: cu.code,
        shortCode: cu.shortCode
    });
});