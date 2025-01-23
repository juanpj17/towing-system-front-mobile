export class ServiceError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ServiceError';
    }
}