import { Request, Response } from 'express';
import Exam from '../Context/Exam/Exam';
import App from '../Context/App/App';
import ExamTitle from "../Context/Exam/ExamTitle";
import ExamURL from "../Context/Exam/ExamURL";

export default class ExamPostController {
  public static async invoke(req: Request, res: Response) {
    try {
      const exam = new Exam(
        new ExamTitle(req.body.title),
        new ExamURL(req.body.uri)
      );
      const app = new App();
      const [report] = await app.run([exam]);
      res.status(201).json(report);
    } catch (err) {
      console.log({ err });
      res.status(500).json({ err: err.message });
    }
  }
}
