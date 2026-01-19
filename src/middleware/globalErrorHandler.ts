import { NextFunction, Request, Response } from "express"
import { Prisma } from "../../generated/prisma/client";


export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = 500;
  let errorMessage = "internal server error"
  let errorDetails = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You Provide incoreect field type of missing fields"

  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400,
        errorMessage = "An operation failed because it depends on one or more records that were required but not found. {cause}"
    } else if (err.code === "P2002") {
      statusCode = 400,
        errorMessage = "Duplicate key error"
    }

    else if (err.code === "P2003") {
      statusCode = 400,
        errorMessage = "foreign key constraint key failed"
    }
  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 500;
    errorMessage = "Error occured during query execution"
  
  }
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage="authentication failed please check your credentials"
    }
    else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "can't reach database server"
    }
  }
  res.status(statusCode)
  res.json({
    message: errorMessage,
    error: errorDetails
  })
}
