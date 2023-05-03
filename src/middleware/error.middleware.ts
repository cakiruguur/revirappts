import { ErrorRequestHandler } from "express";
import HttpException from "../utils/exceptions/http.exception";

const errorMiddleware: ErrorRequestHandler = (err: HttpException, _, res,__) => {
  const status = err.status || 500;
  const message = err.message || "Bazı şeyler yanlış gitti..";
  const errorBody = {
    success : false,
    error : {
      status,
      message
    }
  }

  res.status(status).send(errorBody);
};

export default errorMiddleware;
