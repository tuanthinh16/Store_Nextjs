export interface Product {
    _id: number;
    title: string;
    descriptions:string;
    category:string;
    price: number;
    imageUrl: object;
    rating:object;
}
    
export interface CartItem {
    product: Product;
    qty: number;
}