import axios from "axios";
// const API_URL = "https://jsonplaceholder.typicode.com/users";
const API_URL = `https://dummyjson.com/users`

const getUsers = {
    get: () => axios.get(API_URL).then(({ data }) => data),
    getDetails: (id: number) => axios.get(`${API_URL}/${id}`).then(({ data }) => data)

}

export default getUsers;