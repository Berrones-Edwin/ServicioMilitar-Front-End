export interface NewCompanyResponse {
    "error": boolean,
    "success": boolean,
    "message": string,
    "data": {
        "number": string,
        "mainActivity": string,
        "updated_at": Date,
        "created_at": Date,
        "id": number
    }
}