import Scrapper from '../Scrapper/Scrapper';
import Question from '../Question/Question';
import Exam from '../Exam/Exam';
import TextQuestionFormatter from '../QuestionFormatter/TextQuestionFormatter';

interface ExamReport {
  title: string;
  content: string;
}

export default class App {
  private data = [];
  private reports: ExamReport[] = [];
  private scrapper: Scrapper;

  constructor() {
    this.scrapper = new Scrapper();
  }

  async run(examList: Exam[]) {
    if (!examList || !examList.length)
      throw new Error('No exams found to process');

    await this.scrapper.openNewBrowser();
    console.log("browser opened")

    for (let i = 0; i < examList.length; i++) {
      const exam = examList[i];
      await this.scrapper.goto(exam.uri);
      await this.getQuestions();
      this.saveReport(exam.title);
    }

    await this.scrapper.close();
    return this.reports;
  }

  async getQuestions() {
    console.log('🔎 Gathering questions data...');
    const totalSteps = await this.scrapper.getTotalSteps();
    let currentStep = await this.scrapper.getCurrentStep();

    while (currentStep <= totalSteps) {
      const question = new Question(
        String(currentStep),
        await this.scrapper.getQuestionTitle(),
        await this.scrapper.getQuestionOptions(),
        new TextQuestionFormatter()
      );

      this.saveQuestionData(question);

      if (currentStep < totalSteps) {
        await this.scrapper.goToNextQuestion();
        currentStep = await this.scrapper.getCurrentStep();
      } else {
        break;
      }
    }
  }

  saveQuestionData(question) {
    this.data.push(question);
  }

  getFormattedData(title) {
    const content = this.data
      .map((question) => question.getFormattedQuestion())
      .join('\n');

    return `${title}\n\n${content}`;
  }

  saveReport(title) {
    console.log('📝 Generating document...');
    // fs.writeFileSync('./export_' + title + '.txt', this.getFormattedData(title));
    this.reports.push({
      title,
      content: this.getFormattedData(title),
    });

    this.resetData();
  }

  resetData() {
    this.data = [];
  }
}
