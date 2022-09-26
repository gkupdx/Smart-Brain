import React from 'react';


// Component that displays user's current ranking
const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`Hi ${name}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;