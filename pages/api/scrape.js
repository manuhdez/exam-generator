// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import App from '../../src/App/App';
import Exam from '../../src/Exam/Exam';

export default async (req, res) => {
  try {
    const { title, uri } = JSON.parse(req.body);
    const exam = new Exam(title, uri);
    const app = new App();
    const reports = await app.run([exam]);

    res.status(201).json(reports);
  } catch (err) {
    res.status(500).json({ err });
  }
};
