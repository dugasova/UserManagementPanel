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
        title: string;
    };
    role: string;
    status: 'Active' | 'Blocked'; // Added user status
}

export type UserResponse = {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}
