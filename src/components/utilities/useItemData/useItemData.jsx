import React from 'react';
import { useState, useEffect } from 'react';
const useItemData = function(URL, fetch) {
    const [ error, setError ] = useState(false)
    const [ data, setData ] = useState(null);

    useEffect(() => {
        const dataFetch = async () => {
            await fetch(URL, { mode: "cors" })
            .then(response => response.json(), (error) => {
                throw new Error(error);
            })
            .then(response => {
                setData({
                    id: response.id,
                    title: response.title,
                    price: response.price,
                    description: response.description,
                    imageSrc: response.image
                })
            })
            .catch(() => {
                setError(true)
            });
        }

        dataFetch();
    }, [ URL, setData, fetch, setError ])
    
    return { error, isLoading: false, data: data };
}

export default useItemData;

