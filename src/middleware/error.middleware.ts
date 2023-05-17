import { ErrorRequestHandler } from "express";
import HttpException from "@utils/exceptions/http.exception";

const errorMiddleware: ErrorRequestHandler = (err: HttpException, _, res,__) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong..";
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
