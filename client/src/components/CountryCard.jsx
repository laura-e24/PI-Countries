import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Card from './Card';
import GenericButton from './GenericButton';

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
          #p {
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
            <p id='p'>{country.continent}</p>
          </span>
         <span style={{ display: 'flex', width: '100%', justifyContent:'center' }}>
         <Link to={`/countries/${country.id}`} style={{ textDecoration: 'none' }}>
            <GenericButton type='button'>
              Ver detalles 🔎
            </GenericButton>
          </Link>
         </span>
        </div>
      </Card>
    </>
  );
}
 
export default CountryCard;