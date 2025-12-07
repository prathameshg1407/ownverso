"use strict";
/**
 * Admin List Users Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersHandler = listUsersHandler;
const services_1 = require("../../../../../domain/users/services");
const response_utils_1 = require("../../utils/response.utils");
async function listUsersHandler(request, reply) {
    const { page = 1, limit = 20, createdFrom, createdTo, ...filters } = request.query;
    const query = {
        page,
        limit,
        ...filters,
        createdFrom: createdFrom ? new Date(createdFrom) : undefined,
        createdTo: createdTo ? new Date(createdTo) : undefined,
    };
    const { users, total } = await services_1.adminUserService.listUsers(query);
    (0, response_utils_1.sendPaginated)(reply, request, users, page, limit, total);
}
//# sourceMappingURL=list-users.handler.js.map