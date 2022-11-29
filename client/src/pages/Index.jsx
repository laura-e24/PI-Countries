import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GenericButton from '../components/GenericButton';

const Main = styled.main`
  background: url(/background.jpg);
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  z-index: 0;
  position: relative;
`

const Text = styled.p`
  text-align: center;
  font-size: 20px;
  background: rgba(217, 217, 217, 0.4);
  text-shadow: 1px 1px #8278D7;
`

const Index = () => {
  return (  
    <>
      <style>
        {`
        strong {
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }

        strong::before {
          background-color: #8278D7;

          content: "";
          position: absolute;
          width: calc(100% + 4px);
          height: 50%;
          left: -2px;
          bottom: -5px;
          z-index: -1;
          {/* transform: rotate(-2deg); */}
        }
        `}
      </style>
      <Main>
      <div style={{ margin: 'auto' }}>
        <Header>
          ¡Bienvenido a &nbsp;
          <strong>Henry Countries</strong>
          !
        </Header>
        <Text>
          En este sitio podrás explorar los países del mundo en busca de tu
          próximo destino ✈️
        </Text>
        <span style={{ display: 'flex', width: '100%', justifyContent:'center', marginTop: 20 }}>
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <GenericButton type='button'>
              Ingresar
            </GenericButton>
          </Link>
        </span>
      </div>
    </Main>
    </>
  );
}
 
export default Index;