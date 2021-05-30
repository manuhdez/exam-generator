import { Express, Request, Response, NextFunction } from 'express';
import ExamPostController from '../controllers/ExamPostController';
import ExamsPostController from '../controllers/ExamsPostController';

export default class Router {
  registerRoutes(app: Express) {
    app.post('/exam', ExamPostController.invoke);
    app.post('/exams', ExamsPostController.invoke);
  }
}
