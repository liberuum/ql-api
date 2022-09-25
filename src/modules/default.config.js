export default {
    Auth: { enabled: true },
    ChangeTracking: { enabled: true, require: ['CoreUnit'] },
    ClientVersion: { enabled: true },
    CoreUnit: { enabled: true },
    BudgetStatement: { enabled: true, require: ['Auth', 'CoreUnit'] },
    Mip: { enabled: true, require: ['CoreUnit'] },
    Roadmap: { enabled: true, require: ['CoreUnit'] },
};