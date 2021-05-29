import QuestionOption from '../Question/QuestionOption';
import QuestionFormatter from './QuestionFormatter';

export default class TextQuestionFormatter implements QuestionFormatter {
  public formatTitle(id: string, title: string): string {
    return `${id}. ${title}\n\n`;
  }

  public formatOptions(options: QuestionOption[]): string {
    return options
      .map((option) => {
        const symbol = option.correct ? '✅' : '❌';
        return `${symbol} ${option.value}\n`;
      })
      .join('\n');
  }
}
