"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAddTaskRepository = void 0;
const database_1 = __importDefault(require("@/infra/database"));
class PrismaAddTaskRepository {
    async add(taskData) {
        return database_1.default.task.create({
            data: {
                title: taskData.title,
                description: taskData.description,
                userId: taskData.userId,
            },
        });
    }
}
exports.PrismaAddTaskRepository = PrismaAddTaskRepository;
//# sourceMappingURL=prisma-add-task.js.map