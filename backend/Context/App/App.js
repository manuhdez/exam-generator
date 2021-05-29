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
var Scrapper_1 = require("../Scrapper/Scrapper");
var Question_1 = require("../Question/Question");
var TextQuestionFormatter_1 = require("../QuestionFormatter/TextQuestionFormatter");
var App = /** @class */ (function () {
    function App() {
        this.data = [];
        this.reports = [];
        this.scrapper = new Scrapper_1.default();
    }
    App.prototype.run = function (examList) {
        return __awaiter(this, void 0, void 0, function () {
            var i, exam;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!examList || !examList.length)
                            throw new Error('No exams found to process');
                        return [4 /*yield*/, this.scrapper.openNewBrowser()];
                    case 1:
                        _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < examList.length)) return [3 /*break*/, 6];
                        exam = examList[i];
                        return [4 /*yield*/, this.scrapper.goto(exam.uri)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getQuestions()];
                    case 4:
                        _a.sent();
                        this.saveReport(exam.title);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, this.scrapper.close()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, this.reports];
                }
            });
        });
    };
    App.prototype.getQuestions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalSteps, currentStep, question, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('🔎 Gathering questions data...');
                        return [4 /*yield*/, this.scrapper.getTotalSteps()];
                    case 1:
                        totalSteps = _c.sent();
                        return [4 /*yield*/, this.scrapper.getCurrentStep()];
                    case 2:
                        currentStep = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!(currentStep <= totalSteps)) return [3 /*break*/, 10];
                        _a = Question_1.default.bind;
                        _b = [void 0, String(currentStep)];
                        return [4 /*yield*/, this.scrapper.getQuestionTitle()];
                    case 4:
                        _b = _b.concat([_c.sent()]);
                        return [4 /*yield*/, this.scrapper.getQuestionOptions()];
                    case 5:
                        question = new (_a.apply(Question_1.default, _b.concat([_c.sent(), new TextQuestionFormatter_1.default()])))();
                        this.saveQuestionData(question);
                        if (!(currentStep < totalSteps)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.scrapper.goToNextQuestion()];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this.scrapper.getCurrentStep()];
                    case 7:
                        currentStep = _c.sent();
                        return [3 /*break*/, 9];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [3 /*break*/, 3];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.saveQuestionData = function (question) {
        this.data.push(question);
    };
    App.prototype.getFormattedData = function (title) {
        var content = this.data
            .map(function (question) { return question.getFormattedQuestion(); })
            .join('\n');
        return title + "\n\n" + content;
    };
    App.prototype.saveReport = function (title) {
        console.log('📝 Generating document...');
        // fs.writeFileSync('./export_' + title + '.txt', this.getFormattedData(title));
        this.reports.push({
            title: title,
            content: this.getFormattedData(title),
        });
        this.resetData();
    };
    App.prototype.resetData = function () {
        this.data = [];
    };
    return App;
}());
exports.default = App;
