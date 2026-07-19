export declare class RouteError extends Error {
    status: number;
    constructor(status: number, message: string);
}
