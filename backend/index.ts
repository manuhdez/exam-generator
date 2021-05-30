import express, { json, urlencoded } from 'express';
import cors from 'cors';
import Router from './routes/Router';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const router = new Router();
router.registerRoutes(app);

const port = process.env.PORT || '3001';
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
