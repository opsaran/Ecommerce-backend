import express, { Router } from "express";
import sayhello from "../api/controllers/hello";
const route: Router = express.Router();

route.get("/", sayhello);

export default route;
