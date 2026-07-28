export type Product = {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: {
        usertype: {
            usertype: string;
        };
        category: string;
    };
};

export type ProductListResponse = {
    responseCode: number;
    products: Product[];
};

export type UserDetails = {


    FirstName: string;
    LastName: string;
    Address: string,
    Country: string,
    State: string,
    CityZip: string,
    Zipcode: string,
    Mobile: string

}