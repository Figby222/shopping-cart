import "./ErrorBoundary.css";
import { Link } from "react-router-dom";

function ErrorBoundary() {
    return(
        <>
            <header>
                <h1 className="invalid-page">Invalid page</h1>
            </header>
            <main>
                <p className="main-text">
                    It appears you're lost,
                    <Link to="/homepage">click here to go back home!</Link>
                </p>
            </main>
        </>
    );
}

export default ErrorBoundary;