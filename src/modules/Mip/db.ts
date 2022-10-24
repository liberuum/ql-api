import { Knex } from "knex";

export interface CuMip {
    id: string
    mipCode: string
    cuId: string
    rfc: string
    formalSubmission: string
    accepted: string
    rejected: string
    obsolete: string
    mipStatus: string
    mipUrl: string
    mipTitle: string
    forumUrl: string
    mip39: object
    mip40: object
    mip41: object
    mipReplaces: object
};

export interface MipReplaces {
    id: string
    newMip: string
    replacedMip: string
}

export interface Mip39 {
    id: string
    mipId: string
    mip39Spn: number
    mipCode: string
    cuName: string
    sentenceSummary: string
    paragraphSummary: string
}

export interface Mip40 {
    id: string
    cuMipId: string
    mip40Spn: string
    mkrOnly: boolean
    mkrProgramLength: number
    mip40BudgetPeriod: object
    mip40Wallet: object
}

export interface Mip40BudgetPeriod {
    id: string
    mip40Id: string
    budgetPeriodStart: string
    budgetPeriodEnd: string
    ftes: number
}

export interface Mip40Wallet {
    id: string
    mip40Id: string
    address: string
    name: string
    signersTotal: number
    signersRequired: number
    clawbackLimit: number
    mip40BudgetLineItem: object
}

export interface Mip40BudgetLineItem {
    id: string
    mip40WalletId: string
    position: number
    budgetCategory: string
    budgetCap: number
    canonicalBudgetCategory: string
    group: string
    headcountExpense: boolean
}

export interface Mip41 {
    id: string
    cuMipId: string
    contributorId: string
}

export class MipModel {
    knex: Knex;
    coreUnitModel: object;

    constructor(knex: Knex, coreUnitModel: object) {
        this.knex = knex;
        this.coreUnitModel = coreUnitModel;
    }

    async getMips(cuId: string | undefined): Promise<CuMip[]> {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuMip')
                .orderBy('id');
        } else {
            return this.knex('CuMip').where('cuId', cuId)
        }
    };

    async getMip(paramName: string, paramValue: string): Promise<CuMip[]> {
        return this.knex('CuMip').where(`${paramName}`, paramValue)
    };

    async getMipReplaces(newMip: string | undefined): Promise<MipReplaces[]> {
        if (newMip === undefined) {
            return this.knex
                .select('*')
                .from('MipReplaces')
                .orderBy('id');
        } else {
            return this.knex('MipReplaces').where('newMip', newMip)
        }
    };

    async getMipReplace(paramName: string, paramValue: string): Promise<MipReplaces[]> {
        return this.knex('MipReplaces').where(`${paramName}`, paramValue);
    };

    async getMip39s(mipId: string | undefined): Promise<Mip39[]> {
        if (mipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip39')
                .orderBy('id');
        } else {
            return this.knex('Mip39').where('mipId', mipId)
        }
    };

    async getMip39(paramName: string, paramValue: number | string) {
        return this.knex('Mip39').where(`${paramName}`, paramValue)
    };

    async getMip40s(cuMipId: string | undefined): Promise<Mip40[]> {
        if (cuMipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip40')
                .orderBy('id');
        } else {
            return this.knex('Mip40').where('cuMipId', cuMipId)
        }
    };

    async getMip40(paramName: string, paramValue: string | number | boolean | object): Promise<Mip40[]> {
        return this.knex('Mip40').where(`${paramName}`, paramValue)
    };

    async getMip40BudgetPeriods(mip40Id: string | undefined): Promise<Mip40BudgetPeriod[]> {
        if (mip40Id === undefined) {
            return this.knex
                .select('*')
                .from('Mip40BudgetPeriod')
                .orderBy('id');
        } else {
            return this.knex('Mip40BudgetPeriod').where('mip40Id', mip40Id)
        }
    };

    async getMip40BudgetPeriod(paramName: string, paramValue: string | number): Promise<Mip40BudgetPeriod[]> {
        return this.knex('Mip40BudgetPeriod').where(`${paramName}`, paramValue)
    };

    async getMip40Wallets(mip40Id: string | undefined): Promise<Mip40Wallet[]> {
        if (mip40Id === undefined) {
            return this.knex
                .select('*')
                .from('Mip40Wallet')
                .orderBy('id');
        } else {
            return this.knex('Mip40Wallet').where('mip40Id', mip40Id)
        }
    };

    async getMip40Wallet(paramName: string, paramValue: string | number | object): Promise<Mip40Wallet[]> {
        return this.knex('Mip40Wallet').where(`${paramName}`, paramValue)
    };

    async getMip40BudgetLineItems(mip40WalletId: string | undefined): Promise<Mip40BudgetLineItem[]> {
        if (mip40WalletId === undefined) {
            return this.knex
                .select('*')
                .from('Mip40BudgetLineItem')
                .orderBy('id');
        } else {
            return this.knex('Mip40BudgetLineItem').where('mip40WalletId', mip40WalletId)
        }
    };

    async getMip40BudgetLineItem(paramName: string, paramValue: number | string | boolean) {
        return this.knex('Mip40BudgetLineItem').where(`${paramName}`, paramValue)
    };

    async getMip41s(cuMipId: string | undefined): Promise<Mip41[]> {
        if (cuMipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip41')
                .orderBy('id');
        } else {
            return this.knex('Mip41').where('cuMipId', cuMipId)
        }
    };

    async getMip41(paramName: string, paramValue: string): Promise<Mip41[]> {
        return this.knex('Mip41').where(`${paramName}`, paramValue)
    };

};

export default (knex: Knex, deps: { [key: string]: object }) => new MipModel(knex, deps['CoreUnit']);