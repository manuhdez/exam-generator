export default class ExamURL {
  readonly value: string;
  readonly domain: string;

  constructor(value: string) {
    const url = this.ensureIsValidUrl(value);
    this.value = url.href;
    this.domain = url.hostname;
  }

  private ensureIsValidUrl(value: string) {
    return new URL(value);
  }
}
