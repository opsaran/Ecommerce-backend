"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var hello_1 = __importDefault(require("../api/controllers/hello"));
var route = express_1.default.Router();
route.get("/", hello_1.default);
exports.default = route;
//# sourceMappingURL=index.js.map