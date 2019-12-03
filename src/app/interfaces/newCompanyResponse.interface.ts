export interface NewCompanyResponse {
    "error": boolean,
    "success": boolean,
    "message": string,
    "data": {
        "number": string,
        "mainActivity": string,
        "updated_at": string,
        "created_at": string,
        "id": number
    }
}