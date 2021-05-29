"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Exam = /** @class */ (function () {
    function Exam(title, uri) {
        Exam.checkTitleValidity(title);
        Exam.checkUriValidation(uri);
        this.title = title;
        this.uri = uri;
    }
    Exam.checkTitleValidity = function (title) {
        if (!title)
            throw new Error("Invalid exam title supplied");
    };
    Exam.checkUriValidation = function (uri) {
        if (!uri)
            throw new Error("No url was provided for the exam");
        new URL(uri);
    };
    return Exam;
}());
exports.default = Exam;
