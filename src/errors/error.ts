import { ReasonPhrases, StatusCodes } from 'http-status-codes';
export interface BaseError extends Error {
    statusCode: StatusCodes;
    statusMessage: ReasonPhrases;
    issues?: string[]
}