import puppeteer from 'puppeteer';
import ScraperStrategy from "./ScraperStrategy";

export default class Scrapper {
  private browser: puppeteer.Browser;
  private page: puppeteer.Page;
  private strategy: ScraperStrategy;

  public setStrategy(strategy: ScraperStrategy) {
    if (this.strategy !== strategy) {
      this.strategy = strategy;
    }
  }

  async openNewBrowser() {
    try {
      console.log('🚀 Opening browser...');
      console.log({ path: process.env.PUPPETEER_EXECUTABLE_PATH})
      const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--disable-dev-shm-usage', '--no-sandbox']
      });
      const [page] = await browser.pages();

      this.browser = browser;
      this.page = page;
    } catch (e) {
      console.error(e.message);
    }
  }

  async goto(uri) {
    await this.page.setViewport({ width: 1000, height: 1080 });
    await this.page.goto(uri, { waitUntil: 'load' });
  }

  async getTotalSteps() {
    return await this.strategy.getTotalSteps(this.page);
  }

  async getCurrentStep() {
    return await this.strategy.getCurrentStep(this.page)
  }

  async getQuestionTitle() {
    return this.strategy.getQuestionTitle(this.page)
  }

  async getQuestionOptions() {
    return await this.strategy.getQuestionOptions(this.page)
  }

  async goToNextQuestion() {
    await this.strategy.goToNextQuestion(this.page);
  }

  async close() {
    await this.browser.close();
  }
}
