import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FundraiserCard from "../components/FundraiserCard";
import apiCall from "../utils/api";
import "./HomePage.css";

function HomePage() {
    const [fundraisers, setFundraisers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFundraisers();
    }, []);

    const fetchFundraisers = async () => {
        try {
            // TODO: Replace with actual API call once backend is deployed
            const data = await apiCall('/fundraisers/');
            setFundraisers(data);
        } catch (err) {
            setError(err.message || 'Failed to load fundraisers');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading fundraisers...</div>;
    if (error) return <div className="error-message">{error}</div>;

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