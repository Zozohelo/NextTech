export interface IDevice{
    id:string;
    name: string;
    brand:string;
    image:string;
    price:number;
    category:string;
    description:string;
}

export const defaultDevice : IDevice = {
    id: "",
    name: "",
    brand: "",
    image: "",
    price: 0,
    category: "",
    description: "",
}