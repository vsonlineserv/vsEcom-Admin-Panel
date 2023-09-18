export class Chat
{
    Id:number;
    Username:string;
}

export class ChatMessage
{
    Id:number;
    ChatId:number;
    Message:string;
    Pending:number;
    AdminRead:number;
    UserRead:number;
    MessageOwner:number;
}