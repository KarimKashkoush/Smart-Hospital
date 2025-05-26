import { RequestHandler } from "express";
type FileSpec = {
    required: boolean;
    mimeTypes?: string[];
};
type FileValidationConfig = Record<string, FileSpec>;
export declare function validateFiles(config: FileValidationConfig): RequestHandler;
export {};
