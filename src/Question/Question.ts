import QuestionOption from './QuestionOption';
import QuestionFormatter from '../QuestionFormatter/QuestionFormatter';

export default class Question {
  constructor(
    private id: string,
    private title: string,
    private options: QuestionOption[],
    private formatter: QuestionFormatter
  ) {}

  public formatTitle() {
    return this.formatter.formatTitle(this.id, this.title);
  }

  public formatAnswers() {
    return this.formatter.formatOptions(this.options);
  }

  public getFormattedQuestion() {
    return `${this.formatTitle()}${this.formatAnswers()}`;
  }
}
