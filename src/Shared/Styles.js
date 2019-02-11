import React from 'react'
import { AppContext } from '../App/AppProvider';

const theme = 'dark';
// const theme = 'light';
export const lightTheme = theme === 'light';

export const color = lightTheme ? 'white' : '#222222';

export let lightDarkBackground = `background-color: ${color}`;

export const mainBgColorDark = "#0f0f0f";
export const colorDark1 = "white";
export const mainBgColorLight = "#e1eaee";
export const colorLight1 = "#222";



export const fontColorGreen = `color: #03A9F4`;
export const fontColorWhite = `color: white`;
// export const subtleBoxShadow = `box-shadow: 0px 0px 5px 1px ${lightTheme ? '#a9b6ff' : '#121d5b'}`;


export const greenBoxShadow = `box-shadow: 0px 0px 0px 1px #36D7B7`;
export const redBoxShadow = `box-shadow: 0px 0px 0px 1px #e41111`;

export const fontSizeBig = 'font-size: 2em';
export const fontSize1 = 'font-size: 1.5em;';
export const fontSize2 = 'font-size: 1.0em';
export const fontSize3 = 'font-size: .75em';

export const textAlignCenter = 'text-align: center;';



const Styles = () => {
  return (
    <AppContext.Consumer>
      {({ checked }) => {
        const color = checked ? 'white' : '#222222';
        lightDarkBackground = `background-color: ${color}`;
        
        if (checked) {
          document.body.style.background = mainBgColorLight;
          document.body.style.color = colorLight1;
        } else {
          document.body.style.background = mainBgColorDark;
          document.body.style.color = colorDark1;
        }
      }}
    </AppContext.Consumer>
  )
}

export default Styles
