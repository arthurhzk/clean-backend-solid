"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddTaskController = exports.AddTaskController = void 0;
const http_helper_1 = require("../helpers/http-helper");
const prisma_add_task_1 = require("@/infra/database/repositories/prisma-add-task");
class AddTaskController {
    constructor(addTaskRepository) {
        this.addTaskRepository = addTaskRepository;
    }
    async handle(httpRequest) {
        const task = await this.addTaskRepository.add({
            title: httpRequest.body.title,
            description: httpRequest.body.description,
            userId: httpRequest.body.userId,
        });
        return (0, http_helper_1.ok)(task);
    }
}
exports.AddTaskController = AddTaskController;
const makeAddTaskController = () => {
    const prismaAddTaskRepository = new prisma_add_task_1.PrismaAddTaskRepository();
    return new AddTaskController(prismaAddTaskRepository);
};
exports.makeAddTaskController = makeAddTaskController;
//# sourceMappingURL=add-task-controller.js.map