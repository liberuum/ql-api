export default {
    Auth: { enabled: true },
    ClientVersion: { enabled: true },
    CoreUnit: { enabled: true },
    BudgetStatement: { enabled: true, require: ['CoreUnit'] },
    Mip: { enabled: true, require: ['CoreUnit'] },
    Roadmap: { enabled: true, require: ['CoreUnit'] },
};