import ScraperStrategy from "../ScraperStrategy";
import QuestionOption from "../../Question/QuestionOption";

export default class CarolinaScraperStrategy implements ScraperStrategy {
  getCorrectAnswerId(): Promise<string> {
    return Promise.resolve("");
  }

  getCurrentStep(): Promise<number> {
    return Promise.resolve(0);
  }

  getQuestionOptions(): Promise<QuestionOption[]> {
    return Promise.resolve([]);
  }

  getQuestionTitle(): Promise<string> {
    return Promise.resolve("");
  }

  getTotalSteps(): Promise<number> {
    return Promise.resolve(0);
  }

  goToNextQuestion(): Promise<void> {
    return Promise.resolve(undefined);
  }

}
