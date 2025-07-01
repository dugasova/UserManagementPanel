import axios from "axios";
const API_URL = "https://jsonplaceholder.typicode.com/users";

const getUsers = {
    get: () => axios.get(API_URL).then(({ data }) => data)

}

export default getUsers
