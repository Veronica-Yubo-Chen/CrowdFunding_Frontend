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
                <h1>✨ Glwup ✨</h1>
                <p>Vote with your wallet on beauty product reviews you want to see</p>
                <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '2rem', fontStyle: 'italic' }}>
                    Support creators. Discover honest reviews. Get your glow up.
                </p>
                <Link to="/create-fundraiser" className="cta-button">
                    Start a Campaign
                </Link>
            </div>

            <div className="fundraisers-section">
                <h2>🌟 Product Review Campaigns</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
                    Discover campaigns from beauty creators reviewing your favorite products
                </p>
                {fundraisers.length > 0 ? (
                    <div id="fundraiser-list">
                        {fundraisers.map((fundraiserData) => (
                            <FundraiserCard key={fundraiserData.id} fundraiserData={fundraiserData} />
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">No campaigns yet. Be the first beauty creator to start one!</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;