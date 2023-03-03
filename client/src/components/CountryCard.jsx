import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from './Card';
import GenericButton from './GenericButton';

const Img = styled.img`
  width: 120px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 6px;
`

const H3 = styled.h3`
  font-size: 20px;
  text-align: center;
  line-height: 1.1rem;
`

const P = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #818181;
`

const Container = styled.div`
  height: 100%;
  display: block;
  margin: auto;
  vertical-align: center;
`

const CountryCard = ({ country }) => {
  return (  
    <>
      <Card>
        <Container>
          <Img alt={`${country.name}-flag`} src={country.imgFlag} />
          <span>
            <H3>{country.name}</H3>
            <P>{country.continent}</P>
          </span>
          <span className="w-full flex justify-center">
            <Link to={`/countries/${country.id}`} style={{ textDecoration: 'none' }}>
              <GenericButton type='button'>
                Ver detalles 🔎
              </GenericButton>
            </Link>
          </span>
        </Container>
      </Card>
    </>
  );
}
 
export default CountryCard;