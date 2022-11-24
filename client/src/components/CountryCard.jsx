import styled from 'styled-components'

const Card = styled.div`
  padding: 20px;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
`

const CountryCard = ({ country }) => {
  return (  
    <>
      <style>
        {`
          img {
            width: 150px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
        `}
      </style>
      <Card>
        <img alt={`${country.name}-flag`} src={country.imgFlag} />
        <span>
          <h1>{country.name}</h1>
          <p>{country.continent}</p>
        </span>
        <button type='button'>
          Detalles
        </button>
      </Card>
    </>
  );
}
 
export default CountryCard;