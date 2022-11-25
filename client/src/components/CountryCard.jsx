import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Card = styled.div`
  padding: 20px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const Button = styled.button`
  box-shadow: 0 4px 6px -1px rgba(93, 77, 228, 1), 0 2px 4px -2px rgba(93, 77, 228, 1);
  padding: 8px 10px;
  background: #8278D7;
  -webkit-transition: background 1s; /* For Safari 3.0 to 6.0 */
  transition: background 1s; /* For modern browsers */
	border: none;
  border-radius: 5px;
	outline: inherit;
  cursor: pointer;
  font-size:  17px;
  font-weight: 400;
  color: rgba(237, 236, 236, 1);
  &:hover {
    background: #D1CDF3;
  }
  display: flex;
  margin: auto;
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
            <Button type='button'>
              Ver detalles 🔎
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
 
export default CountryCard;