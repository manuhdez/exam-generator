import ExamTitle from "./ExamTitle";
import ExamURL from "./ExamURL";

export default class Exam {
  constructor(readonly title: ExamTitle, readonly uri: ExamURL) {}
}
