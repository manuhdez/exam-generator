"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlQuestionFormatter = /** @class */ (function () {
    function HtmlQuestionFormatter() {
    }
    HtmlQuestionFormatter.prototype.formatTitle = function (id, title) {
        return "<p><strong>" + id + ".</strong> " + title + "</p>";
    };
    HtmlQuestionFormatter.prototype.formatOptions = function (options) {
        var formattedOptions = options.map(function (answer) { return "<li>" + (answer.correct ? '✅' : '❌') + " " + answer.value + "</li>"; });
        return __spreadArray(__spreadArray(['<ul>'], formattedOptions), ['</ul>']).join('');
    };
    return HtmlQuestionFormatter;
}());
exports.default = HtmlQuestionFormatter;
