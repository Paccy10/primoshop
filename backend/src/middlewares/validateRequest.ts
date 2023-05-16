import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import asyncHandler from "./asyncHandler";

const validate = (schema: AnySchema) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  });

export default validate;
