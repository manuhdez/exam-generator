import puppeteer from 'puppeteer';
import QuestionOption from '../Question/QuestionOption';

export default class Scrapper {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;

  async openNewBrowser() {
    try {
      console.log('🚀 Opening browser...');
      const browser = await puppeteer.launch();
      console.log('browser opened');
      const [page] = await browser.pages();
      console.log('page gathered');

      this.browser = browser;
      this.page = page;
    } catch (e) {
      console.error(e.message)
    }
  }

  async goto(uri) {
    await this.page.setViewport({ width: 1920, height: 1080 });
    await this.page.goto(uri, { waitUntil: 'load' });
  }

  async getTotalSteps() {
    return this.page.$eval('#totalp', (element) => {
      const text = element.textContent.split('/')[1];
      return parseInt(text);
    });
  }

  async getCurrentStep() {
    return this.page.$eval('#totalp', (element) => {
      const text = element.textContent.split('/')[0];
      return parseInt(text);
    });
  }

  async getQuestionTitle() {
    return await this.page.$eval('#demo', (el) => {
      const nodes = [];
      el.childNodes.forEach((child) => {
        if (child.nodeName === '#text') {
          nodes.push(child.textContent.trim());
        }
      });
      return nodes.join('');
    });
  }

  async getCorrectAnswerId() {
    return await this.page.$eval('input[value=correcto]', (el) => el.id);
  }

  async getQuestionOptions() {
    const correctId = await this.getCorrectAnswerId();

    const options = await this.page.$$eval(
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

  public generateOption(id: string, value: string, correct: boolean) {
    return new QuestionOption(id, value, correct);
  }

  async goToNextQuestion() {
    // select an option
    await this.page.click('label[for=r0]');
    // answer question
    await this.page.click('button#bcont');
    // go to next question
    await this.clickNextQuestionButton();
  }

  async clickNextQuestionButton() {
    await this.page.evaluate(() => {
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

  async close() {
    await this.browser.close();
  }
}
