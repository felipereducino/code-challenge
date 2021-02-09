import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    height: 100%;
    width: 100vw;
    max-width: 100%; 
    overflow-x: hidden !important;
    position: sticky;
    font-family: 'Roboto', sans-serif;
  }
`;
