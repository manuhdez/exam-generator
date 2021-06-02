import ScraperStrategy from "../ScraperStrategy";
import {Page} from "puppeteer";
import QuestionOption from "../../Question/QuestionOption";

export default class CarolinaScraperStrategy implements ScraperStrategy {
  private questionCount = 'div.quiz-top-panel__question-score-info';
  private titleSelector = '.player-shape-view p';
  private correctOptionClass = '.choice-view__active-element_correct';

  public async getTotalSteps(page:Page): Promise<number> {
    await this.waitFor(1000);
    const totalStep = await page.$eval(this.questionCount, el => el.textContent.split(' ').pop());
    return parseInt(totalStep);
  }

  public async getCurrentStep(page: Page): Promise<number> {
    await this.waitFor(300);
    const currentStep = await page.$eval(this.questionCount, el => el.textContent.split(' ')[1]);
    return parseInt(currentStep);
  }

  public async getQuestionTitle(page: Page): Promise<string> {
    return await page.$eval(this.titleSelector, el => el.textContent);
  }

  public async getQuestionOptions(page: Page): Promise<QuestionOption[]> {
    const values = await page.$$eval('.choice-content', elements => elements.map(el => el.textContent));

    // check if the exam is from 2020 or 2021
    const examVersion = new URL(page.url()).pathname.split('/').filter(i => i)[2];
    if (examVersion === "2021") {
      await this.selectFirstOption(page);
      await this.clickAnswerButton(page);
      await this.ensureFeedbackModalIsShown(page);
    }

    const correctOption = await this.getCorrectValue(page) || values[0];

    return values.map((option, idx) => {
      return new QuestionOption(
        String(idx + 1),
        option,
        option === correctOption
      );
    });
  }

  public async goToNextQuestion(page:Page): Promise<void> {
    await this.clickAnswerButton(page);
  }

  private async waitFor(ms: number = 0): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private async getCorrectValue(page: Page): Promise<string> {
    try {
      return await page.$eval(this.correctOptionClass, el => el.parentElement.nextElementSibling.nextElementSibling.textContent);
    } catch (e) {
      return null;
    }
  }

  private async selectFirstOption(page: Page): Promise<void> {
    await page.click('.choice-view__active-element-container');
  }

  private async clickAnswerButton(page: Page): Promise<void> {
    const button = '.quiz-control-panel__container_right';
    await page.click(button);
  }

  private async ensureFeedbackModalIsShown(page: Page): Promise<void> {
    const feedbackClass = '.quiz-feedback-panel';
    await this.waitFor(1000);
    await page.$(feedbackClass);
  }
}
