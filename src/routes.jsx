import App from './App';
import Store from "./components/Store/Store.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "store:item",
        element: <Store />,
    },
];

export default routes;