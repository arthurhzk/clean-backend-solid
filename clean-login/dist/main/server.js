"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@/main/config/app");
const env_1 = require("@/main/env");
const app = (0, app_1.setupApp)();
app.listen(env_1.env.PORT, () => console.log('Server running at port ' + env_1.env.PORT));
//# sourceMappingURL=server.js.map