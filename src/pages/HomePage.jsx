import { Link } from "react-router-dom";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
    const { fundraisers, isLoading, error } = useFundraisers();

    if (isLoading) return <div className="loading">Loading fundraisers...</div>;
    if (error) return <div className="error-message">{error.message}</div>;

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Welcome to FundRaizr</h1>
                <p>Support amazing projects and make dreams come true</p>
                <Link to="/create-fundraiser" className="cta-button">
                    Start a Fundraiser
                </Link>
            </div>

            <div className="fundraisers-section">
                <h2>Active Fundraisers</h2>
                {fundraisers.length > 0 ? (
                    <div id="fundraiser-list">
                        {fundraisers.map((fundraiserData) => (
                            <FundraiserCard key={fundraiserData.id} fundraiserData={fundraiserData} />
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">No fundraisers yet. Be the first to create one!</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;