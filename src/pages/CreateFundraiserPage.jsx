import { useState } from 'react';
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

    if (!auth.token) {
        navigate('/login');
        return null;
    }

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
                <h2>Create New Fundraiser</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goal">Goal Amount ($):</label>
                        <input
                            type="number"
                            id="goal"
                            name="goal"
                            min="1"
                            step="0.01"
                            value={formData.goal}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL:</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
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
                            Open for pledges
                        </label>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Fundraiser'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateFundraiserPage;
