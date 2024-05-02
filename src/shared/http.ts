import { HttpStatus, Res } from "@nestjs/common";
import { Request, Response } from "express";

export class HttpErrorHandler {
    message: String
    error: any
    statusCode: HttpStatus
    success: boolean

    constructor({ statusCode, message, error }: { statusCode: HttpStatus, message: String, error: any }) {
        this.message = message
        this.error = error
        this.statusCode = statusCode
        this.success = false
    }
}

export class HttpHandler {
    message: String
    data: any
    statusCode: any
    success: boolean

    constructor({ message, data }: { message: String, data: any }) {
        this.message = message
        this.data = data
        this.statusCode = 200
        this.success = true
    }
}

