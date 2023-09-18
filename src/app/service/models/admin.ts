export class FAQQuery {
    Id: number;
    Question: string;
    Answer: string;
    QuestionBy: string;
    CreatedTime: string;
    CategoryId: number;
}
export class FAQCategoryForm {
    Id: number;
    CategoryId: number;
    CategoryName: string;
}
export class PaypalModel {
    Id: number;
    quantity: string;
    Price: string;
    Total: string;
    Subtotal: string;
    Tax: string;
    Shipping: string;
}