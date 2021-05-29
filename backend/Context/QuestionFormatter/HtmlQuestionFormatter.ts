import QuestionOption from '../Question/QuestionOption';
import QuestionFormatter from './QuestionFormatter';

export default class HtmlQuestionFormatter implements QuestionFormatter {
  public formatTitle(id: string, title: string): string {
    return `<p><strong>${id}.</strong> ${title}</p>`;
  }

  public formatOptions(options: QuestionOption[]): string {
    const formattedOptions = options.map(
      (answer) => `<li>${answer.correct ? '✅' : '❌'} ${answer.value}</li>`
    );

    return ['<ul>', ...formattedOptions, '</ul>'].join('');
  }
}
