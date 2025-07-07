export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    image: string;
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
    };
    company: {
        name: string;
        address: {
            address: string;
            city: string;
            state: string;
            postalCode: string;
        };
    };
}
