import App from './App';
import Homepage from "./components/Homepage/Homepage.jsx";
import Store from "./components/Store/Store.jsx";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "homepage",
        element: <Homepage />,
    },
    {
        path: "store:item",
        element: <Store />,
    },
    {
        path: "shopping-cart",
        element: <ShoppingCart />,
    },
];

export default routes;