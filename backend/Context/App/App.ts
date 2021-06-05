import Scrapper from '../Scrapper/Scrapper';
import Question from '../Question/Question';
import Exam from '../Exam/Exam';
import TextQuestionFormatter from '../QuestionFormatter/TextQuestionFormatter';
import {ValidDomains} from "../Exam/ExamURL";
import PsibobeeScraperStrategy from "../Scrapper/Strategies/PsibobeeScraperStrategy";
import CarolinaScraperStrategy from "../Scrapper/Strategies/CarolinaScraperStrategy";

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

    for (let i = 0; i < examList.length; i++) {
      const exam = examList[i];
      await this.scrapper.goto(exam.uri.value);
      this.updateScraperStrategy(exam);
      await this.getQuestions();
      this.saveReport(exam.title.value);
    }

    await this.scrapper.close();
    return this.reports;
  }

  private updateScraperStrategy(exam: Exam): void {
    switch (exam.uri.domain) {
      case ValidDomains.Psicobee:
        this.scrapper.setStrategy(new PsibobeeScraperStrategy())
        break;
      case ValidDomains.CarolinaLife:
        this.scrapper.setStrategy(new CarolinaScraperStrategy())
        break;
      default:
        this.scrapper.setStrategy(null)
        break;
    }
  }

  async getQuestions() {
    console.log('🔎 Gathering questions data...');
    const totalSteps = await this.scrapper.getTotalSteps();
    let currentStep = await this.scrapper.getCurrentStep();
    const formatter = new TextQuestionFormatter();

    while (currentStep <= totalSteps) {
      const questionId = String(currentStep);
      const title = await this.scrapper.getQuestionTitle();
      const options = await this.scrapper.getQuestionOptions();

      const question = new Question(
        questionId,
        title,
        options,
        formatter
      );

      this.saveQuestionData(question);

      if (currentStep < totalSteps) {
        await this.scrapper.goToNextQuestion();
        const newStep = await this.scrapper.getCurrentStep();
        if (currentStep === newStep) throw new Error("Question is the same")
        currentStep = newStep;
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
