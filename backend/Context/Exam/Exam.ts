export default class Exam {
  readonly title: string;
  readonly uri: string;

  constructor(title: string, uri: string) {
    Exam.checkTitleValidity(title);
    Exam.checkUriValidation(uri);
    this.title = title;
    this.uri = uri;
  }

  private static checkTitleValidity(title: string) {
    if (!title) throw new Error("Invalid exam title supplied")
  }

  private static checkUriValidation(uri: string) {
    if (!uri) throw new Error("No url was provided for the exam")
    new URL(uri);
  }
}
