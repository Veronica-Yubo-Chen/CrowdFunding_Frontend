import { useState } from 'react';
import apiCall from '../utils/api';
import { useAuth } from '../hooks/use-auth.js';
import './PledgeForm.css';

function PledgeForm({ fundraiserId, onSuccess }) {
    const [formData, setFormData] = useState({
        amount: '',
        comment: '',
        anonymous: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();

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
            await apiCall('/pledges/', {
                method: 'POST',
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount),
                    fundraiser: fundraiserId,
                    supporter: parseInt(auth.user_id)
                })
            });

            // Reset form
            setFormData({ amount: '', comment: '', anonymous: false });
            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || 'Failed to create pledge. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pledge-form-container">
            <form onSubmit={handleSubmit} className="pledge-form">
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="amount">Pledge Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        min="1"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment (optional):</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Add a message of support..."
                    />
                </div>
                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="anonymous"
                            checked={formData.anonymous}
                            onChange={handleChange}
                        />
                        Make this pledge anonymous
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit Pledge'}
                </button>
            </form>
        </div>
    );
}

export default PledgeForm;
