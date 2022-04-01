import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        console.log("bad payload", e.issues);
        return res.status(400).json({ success: false, error: e.flatten() });
      }
    }
  };

export default validate;
