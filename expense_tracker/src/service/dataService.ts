import IProduct from "../model/IProduct";
import axios from "axios";

const getDataFromServer = (): Promise<IProduct[]> => {
    return axios.get<IProduct[]>('http://localhost:3001/items').then(res => res.data);
}
const postNewItem = (newItem: Omit<IProduct, 'id'>) => {
    return axios.post<IProduct>(
        'http://localhost:3001/items',
        newItem,
        {
            headers:{
                'Content-Type':'application/json'
            }
        }
    ).then(res => res.data)
}
export {
    getDataFromServer,
    postNewItem
}