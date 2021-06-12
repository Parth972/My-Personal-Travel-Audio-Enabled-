import React from 'react'
import './landing.css'
import GlassCard from './GlassCard'
import GlassCard2 from './GlassCard2'
import GlassCard3 from './GlassCard3'
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { useSpeechContext } from '@speechly/react-client';
import { useEffect, useState } from 'react';

function Landing(props) {

    const { segment } = useSpeechContext();

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
        }
    },[segment]);

    return (
        <div className="land">
            <span className="glass">
                <GlassCard />
                <GlassCard2 />
                <GlassCard3 />
            </span>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    );
}

export default Landing;