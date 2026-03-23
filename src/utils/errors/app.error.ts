import { StatusCodes } from "http-status-codes";

export interface AppError extends Error {
  statusCode: number;
}

export class InternalServerError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.name = "InternalServerError";
    this.stack = stack;
  }
}

export class BadRequestError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
    this.name = "BadRequestError";
    this.stack = stack;
  }
}

export class UnauthorizedError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.message = message;
    this.name = "UnauthorizedError";
    this.stack = stack;
  }
}

export class ForbiddenError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = StatusCodes.FORBIDDEN;
    this.message = message;
    this.name = "ForbiddenError";
    this.stack = stack;
  }
}

export class NotFoundError implements AppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor(message: string, stack?: string) {
    this.statusCode = StatusCodes.NOT_FOUND;
    this.message = message;
    this.name = "NotFoundError";
    this.stack = stack;
  }
}
