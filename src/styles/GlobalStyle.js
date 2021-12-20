import { createGlobalStyle } from 'styled-components'
// import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing : border-box;
}

body {
  /* font-family: ; */
  color: #111;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
}

p, h2, h4 {
	margin: 0;
}

input, textarea {
  padding: 10px;
  outline: none;
}

input:focus, textarea:focus {
  outline: none;
  border: none;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #FFF;
}

a {
  cursor: pointer;
}

`

export default GlobalStyle
