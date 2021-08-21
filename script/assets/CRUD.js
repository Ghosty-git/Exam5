// import { renderColumns } from "../admin.js";
import {closeModal} from './utiles.js'

const ENDPONINT = 'http://localhost:1717';

const getData = async (route) => {
    const responce = await fetch(`${ENDPONINT}/${route}`);
    const data = await responce.json();
    return data
};

const postData = (body) => {
    fetch(`${ENDPONINT}/pastry/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
};

const deleteData = (id) => {
    fetch(`${ENDPONINT}/pastry/delete/${id}`, {
        method: "DELETE"
    });
};

const updateData = (id, body) => {
    fetch(`${ENDPONINT}/pastry/update/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
}

export {getData, postData, deleteData, updateData}