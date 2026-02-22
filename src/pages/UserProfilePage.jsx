import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/use-auth.js';
import { useNavigate, Link } from 'react-router-dom';
import apiCall from '../utils/api';
import './UserProfilePage.css';

function UserProfilePage() {
    const { auth } = useAuth();
    const [userFundraisers, setUserFundraisers] = useState([]);
    const [userPledges, setUserPledges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUserData = useCallback(async () => {
        try {
            // TODO: Replace with actual API calls once backend is deployed
            const [fundraisers, pledges] = await Promise.all([
                apiCall('/fundraisers/?owner=me'),
                apiCall('/pledges/?supporter=me')
            ]);
            setUserFundraisers(fundraisers);
            setUserPledges(pledges);
        } catch (err) {
            setError(err.message || 'Failed to load user data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!auth.token) {
            navigate('/login');
            return;
        }
        fetchUserData();
    }, [auth.token, navigate, fetchUserData]);

    if (!auth.token) return null;
    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="user-profile">
            <div className="profile-header">
                <h1>My Profile</h1>
                <div className="user-info">
                    <p><strong>Logged in with token</strong></p>
                    <p className="token-info">Token: {auth.token?.substring(0, 20)}...</p>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <section className="profile-section">
                <h2>My Fundraisers ({userFundraisers.length})</h2>
                {userFundraisers.length > 0 ? (
                    <div className="fundraisers-grid">
                        {userFundraisers.map((fundraiser) => {
                            const totalPledged = fundraiser.pledges?.reduce((sum, p) => sum + p.amount, 0) || 0;
                            return (
                                <div key={fundraiser.id} className="fundraiser-card">
                                    <h3>
                                        <Link to={`/fundraiser/${fundraiser.id}`}>{fundraiser.title}</Link>
                                    </h3>
                                    <p className="fundraiser-goal">
                                        ${totalPledged.toFixed(2)} / ${fundraiser.goal}
                                    </p>
                                    <p className={`fundraiser-status ${fundraiser.is_open ? 'open' : 'closed'}`}>
                                        {fundraiser.is_open ? 'Open' : 'Closed'}
                                    </p>
                                    <p className="pledge-count">{fundraiser.pledges?.length || 0} pledges</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="empty-state">
                        You haven't created any fundraisers yet. 
                        <Link to="/create-fundraiser"> Create one now!</Link>
                    </p>
                )}
            </section>

            <section className="profile-section">
                <h2>My Pledges ({userPledges.length})</h2>
                {userPledges.length > 0 ? (
                    <div className="pledges-list">
                        {userPledges.map((pledge) => (
                            <div key={pledge.id} className="pledge-card">
                                <div className="pledge-header">
                                    <strong>${pledge.amount}</strong>
                                    <span> to </span>
                                    <Link to={`/fundraiser/${pledge.fundraiser}`}>
                                        {pledge.fundraiser_title || 'Fundraiser'}
                                    </Link>
                                </div>
                                {pledge.comment && (
                                    <p className="pledge-comment">"{pledge.comment}"</p>
                                )}
                                <p className="pledge-date">
                                    {new Date(pledge.date_created).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">
                        You haven't made any pledges yet. 
                        <Link to="/"> Browse fundraisers!</Link>
                    </p>
                )}
            </section>
        </div>
    );
}

export default UserProfilePage;
