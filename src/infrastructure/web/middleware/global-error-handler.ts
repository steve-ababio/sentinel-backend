import { RouteError } from "@infrastructure/error/route-error";
import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let routeError: RouteError
    // If error is not a route error, convert to unknown route error
    if (error instanceof RouteError) {
      routeError = error
    }
    
      console.error("🔥 Unexpected Error:", error);
    
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
  }