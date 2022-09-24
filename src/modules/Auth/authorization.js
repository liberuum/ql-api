const ResourceType = {
    System: "System",
    CoreUnit: "CoreUnit",
}

export class Authorization {
    userId;
    initialized = false;
    db;

    constructor(db, userId) {
        this.db = db;
        this.userId = userId;
    }

    /**
     * Get the user's roles on a particular resource
     */
    async getRoles(resource, resourceId) {
        // query userRole this.userId
        // join of Roles and Permission of Roles
        // returns [{roleName, resource, resourceId}]
    }

    /**
     * Check if the user has a given permission on a resource type or individual resource. 
     */

    // Todo
    // canCreate()
    async canUpdate(resourceType, resourceId) {
        return await this.db.Auth.canUpdate(this.userId, resourceType, resourceId)
    }
    // canDelete()
    async canManage(resourceType) {
        return await this.db.Auth.canManage(this.userId, resourceType)
    }

    async can(permission, resourceType, resourceId = null) {
        
    }

}