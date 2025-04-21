export const BASE_URL = "http://localhost:3000/api";

//Realizar POST Request
export const postHTTP = async(url, body) => {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json()

    return data;
}

//Realizar GET Request
export const getHTTP = async(url) => {
    const response = await fetch(url, {
        method: "GET"
    });

    const data = await response.json()

    return data;
}

//Realizar PATCH Request
export const patchHTTP = async(url, body) => {
    const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json()

    return data;
}

//Realizar DELETE Request
export const deleteHTTP = async(url, body) => {
    const response = await fetch(url, {
        method: "DELETE",
        body: body
    });

    const data = await response.json()

    return data;
}