import {Request, Response} from "express";
import Exam from "../Context/Exam/Exam";
import App from "../Context/App/App";

export default class ExamPostController {
  public static async invoke(req: Request, res: Response) {
      const { title, uri } = req.body;
      console.log({ title, uri })
      const exam = new Exam(title, uri);
      console.log({ exam })
      const app = new App();
    try {
      const [report] = await app.run([exam]);
      res.status(201).json(report);
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
