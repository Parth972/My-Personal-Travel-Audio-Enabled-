import React, {useState, useEffect } from 'react';
import CountryHeader from './CountryHeader'
import Filter from './Filter'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';

const url='https://restcountries.eu/rest/v2/all';

function Countries(props) {

    const { segment } = useSpeechContext();

    const [countries, setCountries]=useState([]);

    const fetchCountriesData = async()=>{
        const response=await fetch(url);
        const countries=await response.json();
        setCountries(countries);

    }

    useEffect(() => {
        fetchCountriesData()
    },[]);

    useEffect(() =>{
        if(segment){
            if(segment.intent.intent === 'move_to'){

                segment.entities.forEach((e) => {
                    switch(e.value){
                        case 'BACK':
                            window.location.href = "http://localhost:3000";
                            break;
                        case 'COUNTRIES':
                            window.location.href = "http://localhost:3000/countries";
                            break;
                        case 'TRAVEL':
                            window.location.href = "http://localhost:3000/travel";
                            break;
                        case 'WEATHER':
                            window.location.href = "http://localhost:3000/weather";
                            break;
                        default:
                            break;
                    }
                })

            }
            else if(segment.intent.intent === 'detail_for'){

                segment.entities.forEach((e) => {

                    switch(e.type){
                        case 'place' || 'detail':

                            const country_det=e.value;
                            window.location.href = `http://localhost:3000/countries/${country_det}`;
                            break;

                        default:

                            break;
                    }
                })

            }
        }
    },[segment]);

    const removeCountry = (numericCode) => {
        const newCountry=countries.filter( (country) => country.numericCode !== numericCode )
        setCountries(newCountry);
    }

    return (
        <div className="countryBody">
            <CountryHeader />
            {/* <Filter /> */}
            <section className="grid">
            {
                countries.map((country) => {
                    const {numericCode,name, population, region, capital, flag}=country

                    return <article key={numericCode}>
                        <div>
                            <img src={flag} alt={name} />
                            <div className="details">
                                <h3 className="country-name">{name}</h3>
                                <h4>Population: <span>{population}</span></h4>
                                <h4>Region: <span>{region}</span></h4>
                                <h4>Capital: <span>{capital}</span></h4>
                               <div className="buttons">
                               <Link to={`/countries/${name}`} className="btn">More Info?</Link>
                                <button className="btn" onClick={ () => removeCountry(numericCode)}>Remove</button>
                               </div>
                            </div>
                        </div>

                    </article>
                })
            }
            </section>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    );
}

export default Countries;