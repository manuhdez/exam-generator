import {Request, Response} from "express";
import Exam from "../../../src/Exam/Exam";
import App from "../../../src/App/App";

export default class ExamsPostController {
  public static async invoke(req: Request, res: Response) {
    try {
      const { exams } = req.body;
      const examList = exams.map(({ title, uri }) => new Exam(title, uri));

      const app = new App();
      const reports = await app.run(examList);

      res.status(201).json(reports);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
