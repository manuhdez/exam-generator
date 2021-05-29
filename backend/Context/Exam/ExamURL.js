"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExamURL = /** @class */ (function () {
    function ExamURL(value) {
        var url = this.ensureIsValidUrl(value);
        this.value = url.href;
        this.domain = url.hostname;
    }
    ExamURL.prototype.ensureIsValidUrl = function (value) {
        return new URL(value);
    };
    return ExamURL;
}());
exports.default = ExamURL;
