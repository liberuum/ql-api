import initApi from "../../initApi";
import { ClientVersionModel } from "./db";

async function getClientVersionModel(): Promise<ClientVersionModel> {
    const apiModule = await initApi({
        ClientVersion: {enabled: true}
    });

    const db = apiModule.datasource;
    return db.module<ClientVersionModel>("ClientVersion");
}

it('returns the last budget tool version', async () => {
    const model = await getClientVersionModel();
    const entry = await model.getLatestBudgetToolVersion();
    expect(entry[0]['version'].length).toBe(5);
});

it('returns an array of budget tool version objects', async () => {
    const model = await getClientVersionModel();
    const entry = await model.getBudgetToolVersions();
    expect(entry.length).toBeGreaterThan(0)
})
