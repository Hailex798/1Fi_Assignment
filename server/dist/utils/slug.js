"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
const toSlug = (s) => (0, slugify_1.default)(s, { lower: true, strict: true, trim: true });
exports.toSlug = toSlug;
