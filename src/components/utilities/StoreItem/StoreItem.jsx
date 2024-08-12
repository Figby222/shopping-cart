import "./StoreItem.css";
import PropTypes from "prop-types";
import { useState } from 'react';
import useItemData from "../useItemData/useItemData.jsx";

const setValidatedUnsignedInteger = (value, setValue, setInputError) => {
    if (value.includes("-")) {
        setInputError(true);
    } else if (value.includes(".")) {
        setInputError(true);
    } else {
        setInputError(false);
    }

    setValue(value);
}

const checkInputValidity = (value) => {
    if (value === "") {
        return false;
    }

    if (value < 0) {
        return false;
    }

    return true;
}

const addToCartButtonHandler = (data, itemQuantity, addToCartHandler, setInputError) => {
    const quantityIsValid = checkInputValidity(itemQuantity);
    if (!quantityIsValid) {
        setInputError(true);
        return;
    }

    addToCartHandler(data, parseInt(itemQuantity));
}

function StoreItem({ addToCartHandler, id }) {
    const [ itemQuantity, setItemQuantity ] = useState(1);
    const { error, isLoading, data } = useItemData(`https://fakestoreapi.com/products/${id}`)
    const [ inputError, setInputError ] = useState(null);


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
            <div className="item-attribute">
                <h4 className="item-title">{data.title}</h4>
            </div>
            <div className="item-attribute">
                <h5 id="item-description">Description:</h5>
                <p className="item-description" aria-labelledby="item-description">
                    {data.description}
                </p>
            </div>
            <div className="item-attribute"><img className="item-image" src={data.imageSrc} alt={`image of ${data.title}`} /></div>
            <div className="item-attribute">
                <h5 id="item-price">Price:</h5>
                <p className="item-price" aria-labelledby="item-price">
                    ${data.price}
                </p>
            </div>
        </div>
        <label htmlFor="item-quantity">Item quantity</label>
        <input 
            type="number" 
            id="item-quantity" 
            step="1" 
            name="item-quantity" 
            value={itemQuantity}
            onChange={(e) => setValidatedUnsignedInteger(e.target.value, setItemQuantity, setInputError)} />
        <span className="quantity-buttons">
            <button className="increase-quantity" aria-label="increase quantity" onClick={() => setValidatedUnsignedInteger(`${parseInt(itemQuantity) + 1}`, setItemQuantity, setInputError)}>{'\u2191'}</button>
            <button className="decrease-quantity" aria-label="decrease quantity" onClick={() => setValidatedUnsignedInteger(`${parseInt(itemQuantity) - 1}`, setItemQuantity, setInputError)}>{'\u2193'}</button>
        </span> 
        {inputError && <p className="input-error">quantity must be an integer</p>}
        <button onClick={() => addToCartButtonHandler(data, itemQuantity, addToCartHandler, setInputError)}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default StoreItem;