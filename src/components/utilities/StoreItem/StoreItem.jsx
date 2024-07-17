import "./StoreItem.css";
import PropTypes from "prop-types";
import { useState } from 'react';
import useItemData from "../useItemData/useItemData.jsx";

function StoreItem({ addToCartHandler, itemId }) {
    const [ itemQuantity, setItemQuantity ] = useState(1);
    const { error, isLoading, data } = useItemData(`https//fakestoreapi.com/products${itemId}`)
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
        <button onClick={() => addToCartHandler(data, itemQuantity)}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired,
    itemId: PropTypes.number.isRequired,
}

export default StoreItem;