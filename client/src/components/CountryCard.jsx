import { Link } from 'react-router-dom';
import styled from 'styled-components'
import GenericButton from './GenericButton';

const Card = styled.div`
  padding: 20px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const CountryCard = ({ country }) => {
  return (  
    <>
      <style>
        {`
          img {
            width: 120px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          h3 {
            font-size: 20px;
            text-align: center;
            line-height: 1.1rem;
          }
          p {
            text-align: center;
            font-size: 20px;
            font-weight: 600;
            color: #818181;
          }
          .contenedor {
            height: 100%;
            display: block;
            margin: auto;
            vertical-align: center;
          }
        `}
      </style>
      <Card>
        <div className='contenedor'>
          <img alt={`${country.name}-flag`} src={country.imgFlag} />
          <span>
            <h3>{country.name}</h3>
            <p>{country.continent}</p>
          </span>
          <Link to={`/countries/${country.id}`} style={{ textDecoration: 'none' }}>
            <GenericButton type='button'>
              Ver detalles 🔎
            </GenericButton>
          </Link>
        </div>
      </Card>
    </>
  );
}
 
export default CountryCard;