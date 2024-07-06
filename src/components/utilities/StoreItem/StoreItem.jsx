import "./StoreItem.css";
import PropTypes from "prop-types";
import { useState } from 'react';

function StoreItem({ addToCartHandler, itemId, useItemData }) {
    const [ itemQuantity, setItemQuantity ] = useState(1);
    return (
        <>
        <label htmlFor="item-quantity">Item quantity</label>
        <input 
            type="number" 
            id="item-quantity" 
            step="1" 
            name="item-quantity" 
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)} /> 
        <button onClick={() => addToCartHandler(itemDetails)}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired,
    itemId: PropTypes.string.isRequired,
    useItemData: PropTypes.func.isRequired,
}

export default StoreItem;