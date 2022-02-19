import { Request, Response } from "express";

export default function sayhello(req: Request, res: Response): void {
  res.send("<h1>Hey world, It's OP</h1>");
}
