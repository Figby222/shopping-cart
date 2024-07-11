import React from 'react';
import { useState, useEffect } from 'react';
const useItemData = function(URL, fetch) {
    let error;
    const [ data, setData ] = useState(null);
    if (!URL) {
        error = true;
    }

    useEffect(() => {
        const dataFetch = async () => {
            const response = await fetch(URL, { mode: "cors" })
            .then(response => response.json())
            .catch(error => console.log(error));
            setData({
                id: response.id,
                title: response.title,
                price: response.price,
                description: response.description,
                imageSrc: response.image
            })
        }

        dataFetch();
    }, [ URL, setData, fetch ])
    
    return { error, isLoading: false, data: data };
}

export default useItemData;

