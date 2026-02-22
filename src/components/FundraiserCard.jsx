import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
    const { fundraiserData } = props;
    const totalPledged = fundraiserData.pledges?.reduce((sum, pledge) => sum + pledge.amount, 0) || 0;
    const progressPercentage = (totalPledged / fundraiserData.goal) * 100;

    return (
        <div className="fundraiser-card">
            <Link to={`/fundraiser/${fundraiserData.id}`}>
                {fundraiserData.image && (
                    <img src={fundraiserData.image} alt={fundraiserData.title} />
                )}
                <div className="card-content">
                    <h3>{fundraiserData.title}</h3>
                    <p className="card-description">
                        {fundraiserData.description?.substring(0, 100)}
                        {fundraiserData.description?.length > 100 ? '...' : ''}
                    </p>
                    <div className="card-progress">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            ></div>
                        </div>
                        <p className="progress-text">
                            ${totalPledged.toFixed(2)} of ${fundraiserData.goal}
                        </p>
                    </div>
                    <p className={`card-status ${fundraiserData.is_open ? 'open' : 'closed'}`}>
                        {fundraiserData.is_open ? 'Open' : 'Closed'}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default FundraiserCard;