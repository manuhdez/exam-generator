export default class ExamTitle {
  readonly value: string;

  constructor(value: string) {
    this.ensureHasValue(value);
    this.value = value;
  }

  private ensureHasValue(value: string) {
    if (!value) throw new Error("The exam cannot have an empty title")
  }
}
