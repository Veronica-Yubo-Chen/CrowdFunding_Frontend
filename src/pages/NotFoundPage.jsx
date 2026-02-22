import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="error-code">404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <p>It might have been moved or deleted.</p>
                <Link to="/" className="home-button">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
