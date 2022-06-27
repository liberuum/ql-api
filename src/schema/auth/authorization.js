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
        return await this.db.canUpdate(this.userId, resourceType, resourceId)
    }
    // canDelete()
    // canManage()

    async can(permission, resourceType, resourceId = null) {
        
    }

}