import "./StoreItem.css";
import PropTypes from "prop-types";
import { useState } from 'react';
import useItemData from "../useItemData/useItemData.jsx";

const setValidatedUnsignedInteger = (value, setValue) => {
    if (value.includes("-")) {
        return;
    }

    if (value.includes(".")) {
        return;
    }

    setValue(parseInt(value));
}

function StoreItem({ addToCartHandler, id }) {
    const [ itemQuantity, setItemQuantity ] = useState(1);
    const { error, isLoading, data } = useItemData(`https://fakestoreapi.com/products/${id}`)

    if (isLoading) {
        return (
            <>
                <h3 className="loading">Loading...</h3>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h3 className="error">An error has occurred</h3>
            </>
        )
    }

    return (
        <>
        <div className="content">
            <h4 className="item-title">{data.title}</h4>
            <p className="item-price">Price: ${data.price}</p>
            <p className="item-description">
                Description: {data.description}
            </p>
            <img className="item-image" src={data.imageSrc} alt={`image of ${data.title}`} />
        </div>
        <label htmlFor="item-quantity">Item quantity</label>
        <input 
            type="number" 
            id="item-quantity" 
            step="1" 
            name="item-quantity" 
            value={itemQuantity}
            onChange={(e) => setValidatedUnsignedInteger(e.target.value, setItemQuantity)} />
        <span className="quantity-buttons">
            <button className="decrement-button" aria-label="decrease quantity" onClick={() => setValidatedUnsignedInteger(`${parseInt(itemQuantity) - 1}`, setItemQuantity)}>{'\u2193'}</button>
        </span> 
        <button onClick={() => addToCartHandler(data, parseInt(itemQuantity))}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default StoreItem;