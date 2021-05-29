"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Question = /** @class */ (function () {
    function Question(id, title, options, formatter) {
        this.id = id;
        this.title = title;
        this.options = options;
        this.formatter = formatter;
    }
    Question.prototype.formatTitle = function () {
        return this.formatter.formatTitle(this.id, this.title);
    };
    Question.prototype.formatAnswers = function () {
        return this.formatter.formatOptions(this.options);
    };
    Question.prototype.getFormattedQuestion = function () {
        return "" + this.formatTitle() + this.formatAnswers();
    };
    return Question;
}());
exports.default = Question;
