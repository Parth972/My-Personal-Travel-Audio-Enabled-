import React from 'react';
import './landing.css'
import styled from 'styled-components';
import {useSpring, animated, config} from 'react-spring';


const Container = styled.div`
    display: inline-block;
    padding: 3em;
    background: #C7D2FE66;
    text-align: center;
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left:50px;
    align-items:center;
    font-family: "Roboto";
    justify-content: center;
    border-radius: 10px;
    z-indez: 1;
    position: relative;
    backdrop-filter: blur(7px);
    border: 2px solid transparent;
    background-clip: border-box;

`;

const StyledH1 = styled.h1`
    line-height: 1.5;
    letter-spacing:1.5;
    margin-top: 20px;
    font-family:"Helvetica Neue";
`;

const StyledH3 = styled.h3`
    line-height: 1.5;
    letter-spacing:1.15;
    font-size: 20px;
    font-family:"sans-serif";
`;

const StyledA = styled.a`
    line-height: 1.5;
    letter-spacing:1.15;
    text-decoration: none;
    color: white;
    font-family:"sans-serif";
`;

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const GlassCard = () => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
    return (
        <Container
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
                transform: props.xys.to({
            range: [0, 0.2, 0.5, 1],
            output: [1, 0.7, 1.5, 1],
          })
        }}
        >
            <StyledH1>Next Destination?</StyledH1>
            <StyledH3>Displays the countries <br /> along with their information <br/> in brief and detail</StyledH3>
            <button class="button"><StyledA href="/countries">Let's Explore</StyledA></button>
        </Container>
    );
}


export default GlassCard;