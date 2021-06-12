import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import CountryHeader from './CountryHeader';
import Filter from './Filter';
import Countries from './Countries';
import Country from './Country';
import App from './App'
import Landing from './Landing';
import CurrencyConvert from './CurrencyConvert'
import Visited from './Visited';
// import alanBtn from '@alan-ai/alan-sdk-web'

// const alankey=process.env.ALAN_AI_KEY;

function StartPage(props) {

    useEffect(() =>{
        document.title="Personal Travel";
    },[])

    return (
        <Router>
            <Route exact path="/" component={Landing} />
            <Route exact path="/travel" component={App}></Route>
            <Route exact path="/travel/visited" component={Visited} ></Route>
            <Route exact  path="/countries">
                <Countries />
            </Route>
            <Route exact path="/countries/:name" component={Country} ></Route>
            <Route exact path="/weather" component={CurrencyConvert} ></Route>

        </Router>
    );
}

export default StartPage;