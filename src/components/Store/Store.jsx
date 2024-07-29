import "./Store.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import PropTypes from "prop-types";
import StoreItem from "../utilities/StoreItem/StoreItem.jsx";


function Store({ cart, setCart }) {
    const addToCartHandler = () => {}
    const removeFromCartHandler = (id) => {
        const index = cart.findIndex((item) => item.id === id);

        const newCart = cart.slice(0, index)
            .concat(cart.slice(index + 1));

        setCart(newCart);
    }

    return (
        <>
            <h2>Store</h2>
            <aside>
                <ShoppingCart cart={cart} removeFromCartHandler={removeFromCartHandler}/>
            </aside>
            <h3>Oriental fresh shirt</h3>
            <StoreItem id={"2"} addToCartHandler={() => {}} />
        </>
    );
}

Store.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
}

export default Store;