import "./Store.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import PropTypes from "prop-types";


function Store({ cart, setCart }) {
    const addToCartHandler = () => {}
    const removeFromCartHandler = (id) => {
        setCart([])
    }

    return (
        <>
            <h2>Store</h2>
            <aside>
                <ShoppingCart cart={cart} removeFromCartHandler={removeFromCartHandler}/>
            </aside>
        </>
    );
}

Store.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
}

export default Store;