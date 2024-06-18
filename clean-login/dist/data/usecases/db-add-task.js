"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAddTask = void 0;
class DbAddTask {
    constructor(addTaskRepository) {
        this.addTaskRepository = addTaskRepository;
    }
    add(taskData) {
        return this.addTaskRepository.add(taskData);
    }
}
exports.DbAddTask = DbAddTask;
//# sourceMappingURL=db-add-task.js.map