"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = require("puppeteer");
var QuestionOption_1 = require("../Question/QuestionOption");
var Scrapper = /** @class */ (function () {
    function Scrapper() {
    }
    Scrapper.prototype.openNewBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var browser, page;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🚀 Opening browser...');
                        return [4 /*yield*/, puppeteer_1.default.launch()];
                    case 1:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.pages()];
                    case 2:
                        page = (_a.sent())[0];
                        this.browser = browser;
                        this.page = page;
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.goto = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.setViewport({ width: 1920, height: 1080 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.goto(uri, { waitUntil: 'load' })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.getTotalSteps = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.$eval('#totalp', function (element) {
                        var text = element.textContent.split('/')[1];
                        return parseInt(text);
                    })];
            });
        });
    };
    Scrapper.prototype.getCurrentStep = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page.$eval('#totalp', function (element) {
                        var text = element.textContent.split('/')[0];
                        return parseInt(text);
                    })];
            });
        });
    };
    Scrapper.prototype.getQuestionTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$eval('#demo', function (el) {
                            var nodes = [];
                            el.childNodes.forEach(function (child) {
                                if (child.nodeName === '#text') {
                                    nodes.push(child.textContent.trim());
                                }
                            });
                            return nodes.join('');
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Scrapper.prototype.getCorrectAnswerId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.$eval('input[value=correcto]', function (el) { return el.id; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Scrapper.prototype.getQuestionOptions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var correctId, options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCorrectAnswerId()];
                    case 1:
                        correctId = _a.sent();
                        return [4 /*yield*/, this.page.$$eval('label.custom-control-label', function (elements) {
                                return elements.map(function (element) { return ({
                                    id: element.htmlFor,
                                    value: element.textContent,
                                }); });
                            })];
                    case 2:
                        options = _a.sent();
                        return [2 /*return*/, options.map(function (_a) {
                                var id = _a.id, value = _a.value;
                                return _this.generateOption(id, value, id === correctId);
                            })];
                }
            });
        });
    };
    Scrapper.prototype.generateOption = function (id, value, correct) {
        return new QuestionOption_1.default(id, value, correct);
    };
    Scrapper.prototype.goToNextQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // select an option
                    return [4 /*yield*/, this.page.click('label[for=r0]')];
                    case 1:
                        // select an option
                        _a.sent();
                        // answer question
                        return [4 /*yield*/, this.page.click('button#bcont')];
                    case 2:
                        // answer question
                        _a.sent();
                        // go to next question
                        return [4 /*yield*/, this.clickNextQuestionButton()];
                    case 3:
                        // go to next question
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.clickNextQuestionButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.evaluate(function () {
                            var next;
                            var buttons = document.querySelectorAll('button.btn.btn-outline-info.btn-lg');
                            buttons.forEach(function (button) {
                                if (button.textContent === 'Siguiente') {
                                    next = button;
                                }
                            });
                            if (!next)
                                throw new Error('No next button was found');
                            next.click();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Scrapper;
}());
exports.default = Scrapper;
