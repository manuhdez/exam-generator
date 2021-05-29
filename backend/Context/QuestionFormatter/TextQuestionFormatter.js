"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextQuestionFormatter = /** @class */ (function () {
    function TextQuestionFormatter() {
    }
    TextQuestionFormatter.prototype.formatTitle = function (id, title) {
        return id + ". " + title + "\n\n";
    };
    TextQuestionFormatter.prototype.formatOptions = function (options) {
        return options
            .map(function (option) {
            var symbol = option.correct ? '✅' : '❌';
            return symbol + " " + option.value + "\n";
        })
            .join('\n');
    };
    return TextQuestionFormatter;
}());
exports.default = TextQuestionFormatter;
