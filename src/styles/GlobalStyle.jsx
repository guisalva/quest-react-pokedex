import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;

    text-decoration: none;
  }

  ul, ol, li {
    list-style-type: none;
  }

  body {
    height: 100vh;
  }

  #root {
    height: 100%;
  }

  .normal {
    background-color: #A8A77A;
    color: #ffffff
  }
	.fire {
    background-color: #EE8130;
    color: #ffffff
  }
	.water {
    background-color: #6390F0;
    color: #ffffff
  }
	.electric {
    background-color: #F7D02C;
    color: #ffffff
  }
	.grass {
    background-color: #7AC74C;
    color: #ffffff
  }
	.ice {
    background-color: #96D9D6;
    color: #ffffff
  }
	.fighting {
    background-color: #C22E28;
    color: #ffffff
  }
	.poison {
    background-color: #A33EA1;
    color: #ffffff
  }
	.ground {
    background-color: #E2BF65;
    color: #ffffff
  }
	.flying {
    background-color: #A98FF3;
    color: #ffffff
  }
	.psychic {
    background-color: #F95587;
    color: #ffffff
  }
	.bug {
    background-color: #A6B91A;
    color: #ffffff
  }
	.rock {
    background-color: #B6A136;
    color: #ffffff
  }
	.ghost {
    background-color: #735797;
    color: #ffffff
  }
	.dragon {
    background-color: #6F35FC;
    color: #ffffff
  }
	.dark {
    background-color: #705746;
    color: #ffffff
  }
	.steel {
    background-color: #B7B7CE;
    color: #ffffff
  }
	.fairy {
    background-color: #D685AD;
    color: #ffffff
  }
  .stellar {
  background-color: #FFD700;
}
.unknown {
  background-color: #68A090;
  color: #ffffff;
}
`;
