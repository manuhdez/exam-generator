import QuestionOption from '../Question/QuestionOption';

export default interface QuestionFormatter {
  formatTitle(id: string, title: string): string;
  formatOptions(options: QuestionOption[]): string;
}
