import React, { useState, useEffect } from 'react';
import { listLogEntries } from './API';
import { useSpeechContext } from '@speechly/react-client';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import './visited.css'
import {Link} from 'react-router-dom'

function Visited(props) {

    const { segment } = useSpeechContext();
    const [logEntries, setLogEntries] = useState([]);

    const getEntries = async () => {
        const logEntries = await listLogEntries();
        setLogEntries(logEntries);
      };

      useEffect(() => {
        getEntries();
      }, []);

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
                        case 'VISITED PLACES':
                            window.location.href = "http://localhost:3000/travel/visited";
                        default:
                            break;
                    }
                })

            }
        }
    },[segment]);

    return (
    <>
        <Link to="/travel" className="back-arrow">
            <i>⬅Back</i>
        </Link>
        <div className="visited-body">

        <h1>List of places visited ✈ </h1>
        <hr className="visit-hr" />
        <br />
            {
                logEntries.map(e => (
                    <div style={{ marginBottom:'20px' }}>
                        <div><span>{e.title}</span> - {new Date(e.visitDate).toLocaleDateString()}</div>
                    </div>
                ))
            }
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    </>
    );
}

export default Visited;