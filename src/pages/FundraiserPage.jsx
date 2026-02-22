import { oneFundraiser } from "../data";

function FundraiserPage() {
    return (
    <div>
        <h2>{oneFundraiser.title}</h2>
        <h3>Create at: {oneFundraiser.date_created}</h3>
        <h3>{`Status: ${oneFundraiser.status}`}</h3>
        <h3>Pledge:</h3>
        <ul>{
            oneFundraiser.pledges.map((pledgeData, Key) => (
                <li key={Key}>{`${pledgeData.amount} from ${pledgeData.supporter}`}</li>
            ))
        }</ul>
    </div>
    );
}

export default FundraiserPage;