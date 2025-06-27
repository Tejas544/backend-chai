class ApiResponse {
    constructor(statusCode , message = "Success" , data) {
        this.statusCode = statusCode
        this.data = data
        this.success = statusCode
        this.message = message
    }
}