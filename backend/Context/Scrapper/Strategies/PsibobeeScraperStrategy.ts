import { Page } from "puppeteer";
import ScraperStrategy from "../ScraperStrategy";
import QuestionOption from "../../Question/QuestionOption";

export default class PsibobeeScraperStrategy implements ScraperStrategy {
  async getCorrectAnswerId(page: Page): Promise<string> {
    return await page.$eval('input[value=correcto]', (el) => el.id);
  }

  async getCurrentStep(page: Page): Promise<number> {
    return await page.$eval('#totalp', (element) => {
      const text = element.textContent.split('/')[0];
      return parseInt(text);
    });
  }

  async getQuestionOptions(page: Page): Promise<QuestionOption[]> {
    const correctId = await this.getCorrectAnswerId(page);

    const options = await page.$$eval(
      'label.custom-control-label',
      (elements) =>
        elements.map((element: HTMLFormElement) => ({
          id: element.htmlFor,
          value: element.textContent,
        }))
    );

    return options.map(({ id, value }) =>
      this.generateOption(id, value, id === correctId)
    );
  }

  public generateOption(id: string, value: string, correct: boolean): QuestionOption {
    return new QuestionOption(id, value, correct);
  }

  async getQuestionTitle(page: Page): Promise<string> {
    return await page.$eval('#demo', (el) => {
      const nodes = [];
      el.childNodes.forEach((child) => {
        if (child.nodeName === '#text') {
          nodes.push(child.textContent.trim());
        }
      });
      return nodes.join('');
    });
  }

  async getTotalSteps(page: Page): Promise<number> {
    return await page.$eval('#totalp', (element) => {
      const text = element.textContent.split('/')[1];
      return parseInt(text);
    });
  }

  async goToNextQuestion(page: Page): Promise<void> {
    // select an option
    await page.click('label[for=r0]');
    // answer question
    await page.click('button#bcont');
    // go to next question
    await this.clickNextQuestionButton(page);
  }

  async clickNextQuestionButton(page: Page) {
    await page.evaluate(() => {
      let next: HTMLButtonElement;
      const buttons = document.querySelectorAll(
        'button.btn.btn-outline-info.btn-lg'
      );
      buttons.forEach((button: HTMLButtonElement) => {
        if (button.textContent === 'Siguiente') {
          next = button;
        }
      });

      if (!next) throw new Error('No next button was found');
      next.click();
    });
  }
}
