const MINUTE = 60;

let fakeId = 1;
const eventMock = (cuId, cuCode, cuShortCode) => ({
    id: fakeId++, 
    datetime:'2022-09-25T17:55:00', 
    event:'CU_BUDGET_STATEMENT_CREATE', 
    params: {coreUnit: {id: cuId, code: cuCode, shortCode: cuShortCode}, budgetStatementId: 123, month: '2022-09'},
    description: `Core Unit ${cuShortCode} submitted a new budget statement for 2022-09`
});

export default {
    
    async getActivityFeed() {
        return [
            eventMock(5, "GOV-001", "GOV"),
            eventMock(9, "CES-001", "CES"),
            eventMock(5, "GOV-001", "GOV"),
        ];
    },
    
    async getCoreUnitActivityFeed(cuId, cuCode, cuShortCode) {
        return [
            eventMock(cuId, cuCode, cuShortCode),
            eventMock(cuId, cuCode, cuShortCode),
            eventMock(cuId, cuCode, cuShortCode),
         ];
    },

    async getCoreUnitLastActivity(cuId, cuCode, cuShortCode) {
        return eventMock(cuId, cuCode, cuShortCode);
    },
};