import {Request, Response} from "express";
import Exam from "../../../src/Exam/Exam";
import App from "../../../src/App/App";

export default class ExamPostController {
  public static async invoke(req: Request, res: Response) {
    try {
      const { title, uri } = req.body;
      const exam = new Exam(title, uri);
      const app = new App();
      const [report] = await app.run([exam]);

      res.status(201).json(report);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
