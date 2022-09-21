import { SQLDataSource } from "datasource-sql";

const MINUTE = 60;
class EcosystemDatabase extends SQLDataSource {

    // ----------- User Auth Queries -----------

    getResourceId(userId) {
        return this.knex
            .select('resourceId')
            .from('UserRole')
            .where('userId', userId)
    }

    canUpdate(userId, resourceType, resourceId) {
        return this.knex
            .count('*')
            .from('UserRole')
            .leftJoin('RolePermission', function () {
                this
                    .on('UserRole.roleId', '=', 'RolePermission.roleId')
                    .andOn('UserRole.resource', '=', 'RolePermission.resource')
            })
            .where({
                userId: userId,
                'RolePermission.permission': 'Update',
                'RolePermission.resource': resourceType,
            })
            .orWhere({ resourceId: null, resourceId: resourceId })

    }

    canManage(userId, resourceType) {
        return this.knex
            .count('*')
            .from('UserRole')
            .leftJoin('RolePermission', function () {
                this
                    .on('UserRole.roleId', '=', 'RolePermission.roleId')
                    .andOn('UserRole.resource', '=', 'RolePermission.resource')
            })
            .where({
                userId: userId,
                'RolePermission.permission': 'Manage',
                'RolePermission.resource': resourceType,
                resourceId: null
            })
    }

    // ----------- Ecosystem Queries ----------- 
    getCoreUnits(limit, offset) {
        if (limit !== undefined && offset !== undefined) {
            return this.knex
                .select('')
                .from('CoreUnit')
                .limit(limit)
                .offset(offset)
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex
                .select('*')
                .from('CoreUnit')
                .orderBy('id')
                .cache(MINUTE)
        }
    };

    getCoreUnit(paramName, paramValue) {
        return this.knex('CoreUnit').where(`${paramName}`, paramValue)
    }

    addCoreUnit(code, name) {
        // return this.knex('CoreUnit').insert({ code: code, name: name })
    }

    getCuUpdates(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuUpdate')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('CuUpdate').where('cuId', cuId)
        }
    }

    getCuUpdate(paramName, paramValue) {
        return this.knex('CuUpdate').where(`${paramName}`, paramValue)
    }

    getBudgetStatements(limit, offset) {
        if (limit !== undefined && offset !== undefined) {
            return this.knex
                .select()
                .from('BudgetStatement')
                .limit(limit)
                .offset(offset)
                .orderBy('month', 'desc')
        } else {
            return this.knex
                .select('*')
                .from('BudgetStatement')
                .orderBy('month', 'desc')
        }
    }

    getBudgetStatementByCuId(cuId) {
        return this.knex('BudgetStatement').where('cuId', cuId)
    }

    getBudgetStatement(paramName, paramValue, secondParamName, secondParamValue) {
        if (secondParamName === undefined && secondParamValue === undefined) {
            return this.knex('BudgetStatement').where(`${paramName}`, paramValue);
        } else {
            return this.knex('BudgetStatement').where(`${paramName}`, paramValue).andWhere(`${secondParamName}`, secondParamValue)
        }
    }

    getAuditReports(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('AuditReport')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('AuditReport').where(`budgetStatementId`, budgetStatementId)
        }
    }

    getAuditReport(paramName, paramValue) {
        return this.knex('AuditReport').where(`${paramName}`, paramValue)
    }

    getBudgetStatementFTEs(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementFtes')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('BudgetStatementFtes').where(`budgetStatementId`, budgetStatementId)
        }
    }

    getBudgetStatementFTE(paramName, paramValue) {
        return this.knex('BudgetStatementFtes').where(`${paramName}`, paramValue)
    }

    getBudgetStatementMKRVests(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementMkrVest')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('BudgetStatementMkrVest').where('budgetStatementId', budgetStatementId)
        }
    }

    getBudgetStatementMKRVest(paramName, paramValue) {
        return this.knex('BudgetStatementMkrVest').where(`${paramName}`, paramValue)
    }

    getBudgetStatementWallets(budgetStatementId) {
        if (budgetStatementId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementWallet')
                .orderBy('id')
        } else {
            return this.knex('BudgetStatementWallet').where('budgetStatementId', budgetStatementId)
        }
    }

    getBudgetStatementWallet(paramName, paramValue) {
        return this.knex('BudgetStatementWallet').where(`${paramName}`, paramValue)
    }

    getBudgetStatementLineItems(limit, offset) {
        if (offset != undefined && limit != undefined) {
            return this.knex
                .select()
                .from('BudgetStatementLineItem')
                .limit(limit)
                .offset(offset)
                .orderBy('month', 'desc')
                .cache(MINUTE)
        } else {
            return this.knex
                .select('*')
                .from('BudgetStatementLineItem')
                .orderBy('month', 'desc')
                .cache(MINUTE)
        }
    }

    getLineItemsByWalletId(walletId) {
        return this.knex('BudgetStatementLineItem').where(`budgetStatementWalletId`, walletId).orderBy('month', 'desc')
    }

    getBudgetStatementLineItem(paramName, paramValue, secondParamName, secondParamValue) {
        if(secondParamName === undefined && secondParamValue === undefined) {
            return this.knex('BudgetStatementLineItem').where(`${paramName}`, paramValue).orderBy('month', 'desc')
        } else {
            return this.knex('BudgetStatementLineItem').where(`${paramName}`, paramValue).andWhere(`${secondParamName}`, secondParamValue)
        }
    }

    getBudgetStatementPayments(budgetStatementWalletId) {
        if (budgetStatementWalletId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementPayment')
                .orderBy('id')
                .cache(MINUTE)

        } else {
            return this.knex('BudgetStatementPayment').where('budgetStatementWalletId', budgetStatementWalletId)
        }

    }

    getBudgetStatementPayment(paramName, paramValue) {
        return this.knex('BudgetStatementPayment').where(`${paramName}`, paramValue)
    }

    getBudgetStatementTransferRequests(budgetStatementWalletId) {
        if (budgetStatementWalletId === undefined) {
            return this.knex
                .select('*')
                .from('BudgetStatementTransferRequest')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('BudgetStatementTransferRequest').where('budgetStatementWalletId', budgetStatementWalletId)
        }
    }

    getBudgetStatementTransferRequest(paramName, paramValue) {
        return this.knex('BudgetStatementTransferRequest').where(`${paramName}`, paramValue)
    }

    getMips(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuMip')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('CuMip').where('cuId', cuId)
        }
    }

    getMip(paramName, paramValue) {
        return this.knex('CuMip').where(`${paramName}`, paramValue)
    }

    getMipReplaces(newMip) {
        if (newMip === undefined) {
            return this.knex
                .select('*')
                .from('MipReplaces')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('MipReplaces').where('newMip', newMip)
        }
    }

    getMipReplace(paramName, paramValue) {
        return this.knex('MipReplaces').where(`${paramName}`, paramValue);
    }

    getMip39s(mipId) {
        if (mipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip39')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip39').where('mipId', mipId)
        }
    }

    getMip39(paramName, paramValue) {
        return this.knex('Mip39').where(`${paramName}`, paramValue)
    }

    getMip40s(cuMipId) {
        if (cuMipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip40')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40').where('cuMipId', cuMipId)
        }
    }

    getMip40(paramName, paramValue) {
        return this.knex('Mip40').where(`${paramName}`, paramValue)
    }

    getMip40BudgetPeriods(mip40Id) {
        if (mip40Id === undefined) {
            return this.knex
                .select('*')
                .from('Mip40BudgetPeriod')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40BudgetPeriod').where('mip40Id', mip40Id)
        }
    }

    getMip40BudgetPeriod(paramName, paramValue) {
        return this.knex('Mip40BudgetPeriod').where(`${paramName}`, paramValue)
    }

    getMip40Wallets(mip40Id) {
        if (mip40Id === undefined) {
            return this.knex
                .select('*')
                .from('Mip40Wallet')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40Wallet').where('mip40Id', mip40Id)
        }
    }

    getMip40Wallet(paramName, paramValue) {
        return this.knex('Mip40Wallet').where(`${paramName}`, paramValue)
    }

    getMip40BudgetLineItems(mip40WalletId) {
        if (mip40WalletId === undefined) {
            return this.knex
                .select('*')
                .from('Mip40BudgetLineItem')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip40BudgetLineItem').where('mip40WalletId', mip40WalletId)
        }
    }

    getMip40BudgetLineItem(paramName, paramValue) {
        return this.knex('Mip40BudgetLineItem').where(`${paramName}`, paramValue)
    }

    getMip41s(cuMipId) {
        if (cuMipId === undefined) {
            return this.knex
                .select('*')
                .from('Mip41')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Mip41').where('cuMipId', cuMipId)
        }
    }

    getMip41(paramName, paramValue) {
        return this.knex('Mip41').where(`${paramName}`, paramValue)
    }

    getSocialMediaChannels(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('SocialMediaChannels')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('SocialMediaChannels').where('cuId', cuId)
        }
    }

    getSocialMediaChannel(paramName, paramValue) {
        return this.knex('SocialMediaChannels').where(`${paramName}`, paramValue)
    }

    getContributorCommitments(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('ContributorCommitment')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('ContributorCommitment').where('cuId', cuId)
        }
    }
    getContributorCommitment(paramName, paramValue) {
        return this.knex('ContributorCommitment').where(`${paramName}`, paramValue)
    }
    getCuGithubContributions(cuId) {
        if (cuId === undefined) {
            return this.knex
                .select('*')
                .from('CuGithubContribution')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('CuGithubContribution').where('cuId', cuId)
        }
    }

    getCuGithubContribution(paramName, paramValue) {
        return this.knex('CuGithubContribution').where(`${paramName}`, paramValue)
    }

    getRoadmaps(ownerCuId) {
        if (ownerCuId === undefined) {
            return this.knex
                .select('*')
                .from('Roadmap')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Roadmap').where('ownerCuId', ownerCuId)
        }
    }

    getRoadmap(paramName, paramValue) {
        return this.knex('Roadmap').where(`${paramName}`, paramValue)
    }

    getRoadmapStakeholders(roadmapId) {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('RoadmapStakeholder')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('RoadmapStakeholder').where('roadmapId', roadmapId)
        }
    }

    getRoadmapStakeholdersByStakeholderId(stakeholderId) {
        return this.knex('RoadmapStakeholder').where('stakeholderId', stakeholderId)
    }

    getRoadmapStakeholder(paramName, paramValue) {
        return this.knex('RoadmapStakeholder').where(`${paramName}`, paramValue)
    }

    getStakeholderRoles(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('StakeholderRole')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('StakeholderRole').where('id', id)
        }
    }

    getStakeholderRole(paramName, paramValue) {
        return this.knex('StakeholderRole').where(`${paramName}`, paramValue)
    }

    getStakeholders(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Stakeholder')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Stakeholder').where('id', id)
        }
    }

    getStakeholder(paramName, paramValue) {
        return this.knex('Stakeholder').where(`${paramName}`, paramValue)
    }

    getRoadmapOutputs(roadmapId) {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('RoadmapOutput')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('RoadmapOutput').where('roadmapId', roadmapId)
        }
    }

    getRoadmapOutput(paramName, paramValue) {
        return this.knex('RoadmapOutput').where(`${paramName}`, paramValue)
    }

    getOutputs(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Output')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Output').where('id', id)
        }
    }

    getOutput(paramName, paramValue) {
        return this.knex('Output').where(`${paramName}`, paramValue)
    }

    getOutputTypes(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('OutputType')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('OutputType').where('id', id)
        }
    }

    getOutputType(paramName, paramValue) {
        return this.knex('OutputType').where(`${paramName}`, paramValue)
    }

    getMilestones(roadmapId) {
        if (roadmapId === undefined) {
            return this.knex
                .select('*')
                .from('Milestone')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Milestone').where('roadmapId', roadmapId)
        }
    }

    getMilestone(paramName, paramValue) {
        return this.knex('Milestone').where(`${paramName}`, paramValue)
    }

    getContributors(limit, offset) {
        if (limit !== undefined && offset !== undefined) {
            return this.knex
                .select()
                .from('Contributor')
                .limit(limit)
                .offset(offset)
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex
                .select('*')
                .from('Contributor')
                .orderBy('id')
                .cache(MINUTE)
        }
    }

    getContributor(paramName, paramValue) {
        return this.knex('Contributor').where(`${paramName}`, paramValue)
    }

    getContributorById(id) {
        return this.knex('Contributor').where('id', id)
    }

    getGithubOrgs(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('GithubOrg')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('GithubOrg').where('id', id)
        }
    }

    getGithubOrg(paramName, paramValue) {
        return this.knex('GithubOrg').where(`${paramName}`, paramValue)
    }

    getGithubRepos(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('GithubRepo')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('GithubRepo').where('id', id)
        }
    }

    getGithubRepo(paramName, paramValue) {
        return this.knex('GithubRepo').where(`${paramName}`, paramValue)
    }

    getMakerGithubEcosystemAll() {
        return this.knex
            .select('*')
            .from('MakerGithubEcosystem')
            .orderBy('id')
            .cache(MINUTE)
    }

    getMakerGithubEcosystem(paramName, paramValue) {
        return this.knex('MakerGithubEcosystem').where(`${paramName}`, paramValue)
    }

    getTasks(id) {
        if (id === undefined) {
            return this.knex
                .select('*')
                .from('Task')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Task').where('id', id)
        }
    }

    getTask(paramName, paramValue) {
        return this.knex('Task').where(`${paramName}`, paramValue)
    }

    getTaskOutputs() {
        return this.knex
            .select('*')
            .from('TaskOutput')
            .orderBy('id')
            .cache(MINUTE)
    }

    getTaskOutput(paramName, paramValue) {
        return this.knex('TaskOutput').where(`${paramName}`, paramValue)
    }

    getReviews(taskId) {
        if (taskId === undefined) {
            return this.knex
                .select('*')
                .from('Review')
                .orderBy('id')
                .cache(MINUTE)
        } else {
            return this.knex('Review').where('taskId', taskId)
        }
    }

    getReview(paramName, paramValue) {
        return this.knex('Review').where(`${paramName}`, paramValue)
    }

    getUser(userName) {
        return this.knex('User').where('userName', userName)
    }

    getBudgetToolVersions() {
        return this.knex('BudgetToolVersion').orderBy('id', 'desc').cache(MINUTE);
    }

    getLatestBudgetToolVersion() {
        return this.knex('BudgetToolVersion').orderBy('id', 'desc').limit(1);
    }

    // ------------------- Adding data --------------------------------

    addBatchtLineItems(rows) {
        const chunkSize = rows.lenght
        return this.knex.batchInsert('BudgetStatementLineItem', rows, chunkSize).returning('*');
    }

    addBatchBudgetStatements(rows) {
        const chunkSize = rows.lenght;
        return this.knex.batchInsert('BudgetStatement', rows, chunkSize).returning('*');
    }

    addBudgetStatementWallets(rows) {
        const chunkSize = rows.lenght;
        return this.knex.batchInsert('BudgetStatementWallet', rows, chunkSize).returning('*');
    }

    async createUser(cuId, userName, password) {
        const user = await this.knex('User').insert({ userName, password }).returning("*");
        const userRole = await this.knex('UserRole').insert({ userId: user[0].id, roleId: 1, resource: 'CoreUnit', resourceId: cuId }).returning('*');
        return {
            id: user[0].id,
            cuId: userRole[0].resourceId,
            userName: user[0].userName
        }

    }

    // ------------------- Updating data --------------------------------

    changeUserPassword(userName, password) {
        return this.knex('User').where('userName', userName).update('password', password).returning('*')
    }

    async batchUpdateLineItems(lineItems) {
        const trx = await this.knex.transaction();
        try {
            const result = await Promise.all(lineItems.map(lineItem => {
                let id = lineItem.id;
                delete lineItem.id
                return this.knex('BudgetStatementLineItem')
                    .where('id', id)
                    .update(lineItem)
                    .transacting(trx)
                    .returning('*')
            }));
            await trx.commit()
            return result.flat();
        } catch (error) {
            await trx.rollback()
        }
    }

    async batchDeleteLineItems(lineItems) {
        const trx = await this.knex.transaction();
        try {
            const result = await Promise.all(lineItems.map(lineItem => {
                let id = lineItem.id;
                delete lineItem.id
                return this.knex('BudgetStatementLineItem')
                    .where('id', id)
                    .del(lineItem)
                    .transacting(trx)
                    .returning('*')
            }));
            await trx.commit()
            return result.flat();
        } catch (error) {
            await trx.rollback()
        }
    }

}

export default EcosystemDatabase;