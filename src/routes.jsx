import App from './App';
import ErrorBoundary from './components/utilities/ErrorBoundary/ErrorBoundary';

const routes = [
    {
        path: "/:name",
        element: <App />,
        errorElement: <ErrorBoundary />,
    },
];

export default routes;