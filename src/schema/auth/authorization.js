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
        /**
         * Example:
         *  let auth = new Authorization(2);    // Create authorization object for user with userId = 2
         *  let allowed = auth.canUpdate(ResourceType.CoreUnit, 39)  // Check if the current user can Update the Core Unit with ID = 39
         *  let allowed = auth.canDelete(ResourceType.CoreUnit) // Check if the current user can Update the Core Unit with ID = 39
         * 
         *  if (!allowed) {
         *      throw new Error('User does not have permission to update core unit ' + coreUnitId)
         *  }
         * 
         * Implementation: 
         * 
         * Which roles does the user have on the given resourceType / resourceID ? 
         *      // If {resourceId} is given
         *      UserRole            (userId={userId}, resourceType={resourceType}, (resourceId={resourceId} OR resourceId IS NULL)) 
         *      // If {resourceId} is null
         *      UserRole            (userId={userId}, resourceType={resourceType}, resourceId IS NULL) 
         * 
         * Do any of these roles have the requested permission? 
         *      // Join with RolePermission
         *      x RolePermission    (roleId = UserRole.roleId, resourceType={resourceType}, permission={permission})
         * 
         *  Example: can the current user (with userId=2) Update the CoreUnit with id=39
         *      - userId = 2
         *      - permission = 'Update'
         *      - resourceType = 'CoreUnit'
         *      - resourceId = 39
         *  
SELECT ur.* 
    FROM public."UserRole" ur
    LEFT JOIN public."RolePermission" rp ON ur.roleId = rp.roleId



// ---- example query to run -- if 1, it's allowed with query

// Check if userId 0 can Update CoreUnit with ID=39
SELECT COUNT(*) allowed
FROM public."UserRole" ur
LEFT JOIN public."RolePermission" rp ON 
    ur."roleId" = rp."roleId"
    AND ur."resource" = rp."resource"
 WHERE
    ur."userId" = 0
    AND rp."permission" = 'Update'
    AND ur."resource" = 'CoreUnit'
    AND (ur."resourceId" IS NULL OR ur."resourceId"=39)

// Check if userId 0 can Delete ANY CoreUnit
SELECT COUNT(*) allowed
FROM public."UserRole" ur
LEFT JOIN public."RolePermission" rp ON 
    ur."roleId" = rp."roleId"
    AND ur."resource" = rp."resource"
 WHERE
    ur."userId" = 0
    AND rp."permission" = 'Delete'
    AND ur."resource" = 'CoreUnit'
    AND ur."resourceId" IS NULL



    // ------- EXAMPLE ------------------------
SELECT 
    ur."userId", 
    rp."permission", 
    ur."resource", 
    ur."resourceId",
    ur."roleId"

FROM public."UserRole" ur

LEFT JOIN public."RolePermission" rp ON 
    ur."roleId" = rp."roleId"
    AND ur."resource" = rp."resource"

 WHERE
    ur."userId" = 0
    AND rp."permission" = 'Update'
    AND ur."resource" = 'CoreUnit'
    AND (ur."resourceId" IS NULL OR ur."resourceId"=39)
*/
    }

}