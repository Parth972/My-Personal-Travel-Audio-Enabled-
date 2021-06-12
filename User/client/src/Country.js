import React from 'react';
import {BrowserRouter as Router, Route, Link, useParams} from 'react-router-dom';
import CountryHeader from './CountryHeader';
import Filter from './Filter';
import {useEffect, useState} from 'react';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';
import './country.css'

function Country(props) {

    const { segment } = useSpeechContext();

    const [country, setCountry]=useState([]);
    const {name} = useParams();

    const fetchCountryData = async () => {
        const response=await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        const country=await response.json();
        setCountry(country);

    }
    useEffect(() =>{
            fetchCountryData();
    },[name])

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
                      case 'place':

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

    return (
        <div>
            <Link to="/countries" className="back-arrow">
                <i>⬅Back</i>
            </Link>
            <section className="country">
            {country.map((c) => {
          const {
            numericCode,
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = c

          return (
            <article key={numericCode}>
              <div className="country-inner">
                <div className="flag">
                  <img src={flag} alt={name} />
                </div>

                <div className="country-details">
                  <div>
                    <h2>{name}</h2>
                    <h5>
                      Native Name: <span>{nativeName}</span>
                    </h5>
                    <h5>
                      Population: <span>{population}</span>
                    </h5>
                    <h5>
                      Region: <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region: <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital: <span>{capital}</span>{' '}
                    </h5>
                  </div>

                  <div>
                    <h5>
                      Top Level Domain: <span>{topLevelDomain}</span>
                    </h5>
                    <h5>
                      Currencies: <span>{currencies[0].name}</span>
                    </h5>
                    <h5>
                      Languages: <span>{languages[0].name}</span>
                    </h5>
                  </div>
                </div>
              </div>

              <div>
                <h3>Border Countries: </h3>
                <div className="borders">
                  { borders.length >0 ? borders.map((border) => {
                    return (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    )
                  }): 'NONE'}
                </div>
              </div>
            </article>
          )
        })}
        </section>
        <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    );
}

export default Country;