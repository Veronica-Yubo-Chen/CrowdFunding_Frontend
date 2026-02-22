import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.js';
import apiCall from '../utils/api';
import PledgeForm from '../components/PledgeForm';
import './FundraiserDetailPage.css';

function FundraiserDetailPage() {
    const { id } = useParams();
    const [fundraiser, setFundraiser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const { auth, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFundraiser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchFundraiser = async () => {
        try {
            // TODO: Replace with actual API call once backend is deployed
            const data = await apiCall(`/fundraisers/${id}/`);
            setFundraiser(data);
            setEditData({
                title: data.title,
                description: data.description,
                goal: data.goal,
                is_open: data.is_open
            });
        } catch (err) {
            setError(err.message || 'Failed to load fundraiser');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this fundraiser?')) {
            return;
        }

        try {
            // TODO: Replace with actual API call once backend is deployed
            await apiCall(`/fundraisers/${id}/`, { method: 'DELETE' });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to delete fundraiser');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // TODO: Replace with actual API call once backend is deployed
            const data = await apiCall(`/fundraisers/${id}/`, {
                method: 'PUT',
                body: JSON.stringify(editData)
            });
            setFundraiser(data);
            setIsEditing(false);
        } catch (err) {
            setError(err.message || 'Failed to update fundraiser');
        }
    };

    const handlePledgeSuccess = () => {
        setShowPledgeForm(false);
        fetchFundraiser(); // Refresh to show new pledge
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!fundraiser) return <div className="error-message">Fundraiser not found</div>;

    // TODO: Once backend returns user info with token, compare auth.user.id with fundraiser.owner
    const isOwner = false; // Will need user data from backend to determine ownership
    const totalPledged = fundraiser.pledges?.reduce((sum, pledge) => sum + pledge.amount, 0) || 0;
    const progressPercentage = (totalPledged / fundraiser.goal) * 100;

    return (
        <div className="fundraiser-detail">
            {isEditing ? (
                <form onSubmit={handleUpdate} className="edit-form">
                    <h2>Edit Fundraiser</h2>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={editData.title}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Goal:</label>
                        <input
                            type="number"
                            value={editData.goal}
                            onChange={(e) => setEditData({ ...editData, goal: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={editData.is_open}
                                onChange={(e) => setEditData({ ...editData, is_open: e.target.checked })}
                            />
                            Open for pledges
                        </label>
                    </div>
                    <div className="button-group">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    {fundraiser.image && (
                        <img src={fundraiser.image} alt={fundraiser.title} className="fundraiser-image" />
                    )}
                    <h1>{fundraiser.title}</h1>
                    <p className="fundraiser-meta">
                        Created by: {fundraiser.owner_username || 'Unknown'} | 
                        Created: {new Date(fundraiser.date_created).toLocaleDateString()}
                    </p>
                    <p className="fundraiser-description">{fundraiser.description}</p>
                    
                    <div className="progress-section">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div>
                        </div>
                        <p className="progress-text">
                            ${totalPledged.toFixed(2)} raised of ${fundraiser.goal} goal
                        </p>
                    </div>

                    <p className={`status ${fundraiser.is_open ? 'open' : 'closed'}`}>
                        Status: {fundraiser.is_open ? 'Open' : 'Closed'}
                    </p>

                    {isOwner && (
                        <div className="owner-actions">
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete} className="delete-btn">Delete</button>
                        </div>
                    )}

                    {fundraiser.is_open && auth.token && !isOwner && (
                        <div className="pledge-section">
                            <button onClick={() => setShowPledgeForm(!showPledgeForm)}>
                                {showPledgeForm ? 'Hide Pledge Form' : 'Make a Pledge'}
                            </button>
                            {showPledgeForm && (
                                <PledgeForm 
                                    fundraiserId={id} 
                                    onSuccess={handlePledgeSuccess}
                                />
                            )}
                        </div>
                    )}

                    <div className="pledges-section">
                        <h2>Pledges ({fundraiser.pledges?.length || 0})</h2>
                        {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
                            <ul className="pledges-list">
                                {fundraiser.pledges.map((pledge) => (
                                    <li key={pledge.id} className="pledge-item">
                                        <div className="pledge-info">
                                            <strong>${pledge.amount}</strong>
                                            <span> by {pledge.anonymous ? 'Anonymous' : pledge.supporter_username}</span>
                                        </div>
                                        {pledge.comment && <p className="pledge-comment">{pledge.comment}</p>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No pledges yet. Be the first to support!</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default FundraiserDetailPage;
