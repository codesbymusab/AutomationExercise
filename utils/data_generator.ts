export function generateRandomEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `testuser${timestamp}${random}@example.com`;
}

export const testUserProfile = {
    Username: process.env.VALID_USERNAME as string,
    Password: process.env.VALID_PASSWORD as string,
    FirstName: 'Muhammad',
    LastName: 'Musab',
    Address: 'Valencia Town',
    Country: 'India',
    State: 'Punjab',
    CityZip: 'Lahore',
    Zipcode: '54770',
    Mobile: '03068422727'
}
export const testProductList = [
    {
        "id": 1,
        "name": "Blue Top",
        "price": "Rs. 500",
        "brand": "Polo",
        "category": {
            "usertype": {
                "usertype": "Women"
            },
            "category": "Tops"
        }
    },
    {
        "id": 2,
        "name": "Men Tshirt",
        "price": "Rs. 400",
        "brand": "H&M",
        "category": {
            "usertype": {
                "usertype": "Men"
            },
            "category": "Tshirts"
        }
    },

    {
        "id": 11,
        "name": "Sleeves Printed Top - White",
        "price": "Rs. 499",
        "brand": "Babyhug",
        "category": {
            "usertype": {
                "usertype": "Kids"
            },
            "category": "Tops & Shirts"
        }
    },

    {
        "id": 24,
        "name": "Colour Blocked Shirt – Sky Blue",
        "price": "Rs. 849",
        "brand": "Allen Solly Junior",
        "category": {
            "usertype": {
                "usertype": "Kids"
            },
            "category": "Tops & Shirts"
        }
    },

    {
        "id": 39,
        "name": "Cotton Silk Hand Block Print Saree",
        "price": "Rs. 3000",
        "brand": "Biba",
        "category": {
            "usertype": {
                "usertype": "Women"
            },
            "category": "Saree"
        }
    },

    {
        "id": 43,
        "name": "GRAPHIC DESIGN MEN T SHIRT - BLUE",
        "price": "Rs. 1389",
        "brand": "Mast & Harbour",
        "category": {
            "usertype": {
                "usertype": "Men"
            },
            "category": "Tshirts"
        }
    }
]

export const testPaymentDetails = {

    name: 'John Doe',
    cardNumber: '4111111111111111',
    expiryMonth: '12',
    expiryYear: '2025', 
    cvv: '123'

}