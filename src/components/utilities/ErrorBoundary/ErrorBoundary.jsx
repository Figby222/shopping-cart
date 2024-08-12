import "./ErrorBoundary.css";
import { Link } from "react-router-dom";

function ErrorBoundary() {
    return(
        <>
            <h1 className="invalid-page">Invalid page</h1>
            <p className="main-text">
                It appears you're lost,
                <Link to="/homepage">click here to go back home!</Link>
            </p>
        </>
    );
}

export default ErrorBoundary;