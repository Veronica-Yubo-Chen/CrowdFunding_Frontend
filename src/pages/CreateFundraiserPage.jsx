import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth.js';
import apiCall from '../utils/api';
import '../pages/AuthForm.css';

function CreateFundraiserPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        goal: '',
        image: '',
        is_open: true
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigate = useNavigate();

    // Check authentication with useEffect instead of in render
    useEffect(() => {
        if (!auth.token) {
            navigate('/login');
        }
    }, [auth.token, navigate]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // TODO: Replace with actual API call once backend is deployed
            const data = await apiCall('/fundraisers/', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    goal: parseFloat(formData.goal)
                })
            });

            navigate(`/fundraiser/${data.id}`);
        } catch (err) {
            setError(err.message || 'Failed to create fundraiser. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form" style={{ maxWidth: '600px' }}>
                <h2>🌟 Launch Your Beauty Campaign</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Share your product review vision and let the beauty community vote with their wallets
                </p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Campaign Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Best K-Beauty Moisturizers Comparison"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Campaign Details:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe what products you'll review and why..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goal">Funding Goal ($):</label>
                        <input
                            type="number"
                            id="goal"
                            name="goal"
                            min="1"
                            step="0.01"
                            value={formData.goal}
                            onChange={handleChange}
                            placeholder="How much do you need?"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Campaign Image URL:</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/campaign-image.jpg"
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="is_open"
                                checked={formData.is_open}
                                onChange={handleChange}
                                style={{ width: 'auto', marginRight: '0.5rem' }}
                            />
                            Open campaign for pledges
                        </label>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Launching...' : '✨ Launch Campaign'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateFundraiserPage;
