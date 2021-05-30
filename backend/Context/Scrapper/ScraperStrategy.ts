import { Page } from "puppeteer";
import QuestionOption from "../Question/QuestionOption";

export default interface ScraperStrategy {
  getTotalSteps(page: Page): Promise<number>;
  getCurrentStep(page: Page): Promise<number>;
  getQuestionTitle(page: Page): Promise<string>;
  getQuestionOptions(page: Page): Promise<QuestionOption[]>;
  goToNextQuestion(page: Page): Promise<void>;
}
