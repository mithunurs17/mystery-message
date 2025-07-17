import {Message} from "@/model/User"
export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean; // Optional field to indicate if the API is accepting messages
    data?: any; // Optional data field for successful responses
    error?: string; // Optional error field for error responses
    messages?: Array<Message>; // Optional field to include messages in the response
}