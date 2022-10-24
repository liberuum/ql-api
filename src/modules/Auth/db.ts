import { Knex } from "knex";

export interface User {
    id: string
    cuId: string
    userName: string
}

export interface count {
    count: number | string
}

export class AuthModel {
    knex: Knex;

    constructor(knex: Knex) {
        this.knex = knex;
    };

    async getUser(userName: string): Promise<User[]> {
        return this.knex('User').where('userName', userName)
    };

    async getResourceId(userId: number) {
        return this.knex
            .select('resourceId')
            .from('UserRole')
            .where('userId', userId)
    };

    async canUpdate(userId: number, resourceType: string, resourceId: number): Promise<any> {
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
            .orWhere({ resourceId: null || resourceId })
    };

    async canManage(userId: number, resourceType: string): Promise<any> {
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
            });
    };

    async changeUserPassword(userName: string, password: string): Promise<any> {
        return this.knex('User').where('userName', userName).update('password', password).returning('*')
    };

    async createUser(cuId: string, userName: string, password: string): Promise<any> {
        const user = await this.knex('User').insert({ userName, password }).returning("*");
        const userRole = await this.knex('UserRole').insert({ userId: user[0].id, roleId: 1, resource: 'CoreUnit', resourceId: cuId }).returning('*');
        return {
            id: user[0].id,
            cuId: userRole[0].resourceId,
            userName: user[0].userName
        }

    }
};

export default (knex: Knex) => new AuthModel(knex);