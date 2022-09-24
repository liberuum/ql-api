export default {

    getUser(userName) {
        return this.knex('User').where('userName', userName)
    },

    getResourceId(userId) {
        return this.knex
            .select('resourceId')
            .from('UserRole')
            .where('userId', userId)
    },

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

    },

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
    },

    changeUserPassword(userName, password) {
        return this.knex('User').where('userName', userName).update('password', password).returning('*')
    },

    async createUser(cuId, userName, password) {
        const user = await this.knex('User').insert({ userName, password }).returning("*");
        const userRole = await this.knex('UserRole').insert({ userId: user[0].id, roleId: 1, resource: 'CoreUnit', resourceId: cuId }).returning('*');
        return {
            id: user[0].id,
            cuId: userRole[0].resourceId,
            userName: user[0].userName
        }

    },
};