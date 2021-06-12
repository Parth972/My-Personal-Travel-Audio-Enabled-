import React from 'react';
import { Link } from 'react-router-dom'

function CountryHeader(props) {

    return (
        <div>
            <header className="countryHeader">
                <div>
                    <h1 style={{ marginLeft:'10px' }}>What are you looking for?</h1>
                    <Link to="/" className="back-arrow">
                        <i style={{ paddingBottom: '20px' }}>⬅Back</i>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export default CountryHeader;