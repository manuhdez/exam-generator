import express from 'express';
import {json, urlencoded} from "express";
import Router from "./routes/Router";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const router = new Router();
router.registerRoutes(app);

const port = process.env.PORT || "3001"
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
