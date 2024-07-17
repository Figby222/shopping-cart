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

function StoreItem({ addToCartHandler, itemId }) {
    const [ itemQuantity, setItemQuantity ] = useState(1);
    const { error, isLoading, data } = useItemData(`https//fakestoreapi.com/products${itemId}`)
    return (
        <>
        <div className="content">
            <h3></h3>
        </div>
        <label htmlFor="item-quantity">Item quantity</label>
        <input 
            type="number" 
            id="item-quantity" 
            step="1" 
            name="item-quantity" 
            value={itemQuantity}
            onChange={(e) => setValidatedUnsignedInteger(e.target.value, setItemQuantity)} /> 
        <button onClick={() => addToCartHandler(data, parseInt(itemQuantity))}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired,
    itemId: PropTypes.number.isRequired,
}

export default StoreItem;