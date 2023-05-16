import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import styled from 'styled-components';
import NoResults from '../components/NoResults';
import CountrySkeleton from '../components/CountrySkeleton';
import Layout from '../layouts/Layout';
import { fetchOneCountry, selectOneCountryStatus } from '../features/countries/countriesSlice';
import { EStateGeneric } from '../redux/types';

const CardsContainer = styled.div`
  justify-content: center;
  margin-right: 20px;
`
const Card = styled.div`
  padding: 20px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const H2 = styled.h2`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 10px
`

const H3 = styled.h3`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 5px;
  display: inline-block;
`

const H4 = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px
`
const Td = styled.td`
  margin-top: 15px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px
`

const Country = () => {

  const dispatch  = useDispatch();
  const countryStatus = useSelector(selectOneCountryStatus);
  const params = useParams();
  const { countryId } = params;
  const country = useSelector((state) => state.countries.countries.find(c => c.id === countryId));
  
  useEffect(() => {
    const fetchData = async () => {
      if (countryStatus === EStateGeneric.IDLE) {
        await dispatch(fetchOneCountry(countryId.toString()));
      }
    }
    fetchData()
  }, [countryId])

  return (  
    <>
      <style>
        {`
          #spanId {
            color: #818181;
            font-weight: 400;
            font-size: 25px
          }
          .att {
            font-weight: 600
          }
          .data {
            color: #818181;
          }
        `}
      </style>
      <Layout>
        {countryStatus === EStateGeneric.SUCCEEDED ? (
          <>
          <H2>{country.name} &nbsp;<span id='spanId'>({countryId})</span></H2>
          <CardsContainer>
            <Card style={{ width: '100%', display: 'flex' }}>
              <img src={country.imgFlag} alt={`${country.name}-flag`} height={115} style={{ padding: 15, marginLeft: 10 }} />
              <table style={{ tableLayout: 'auto', marginLeft: 50 }}>
                <tbody>
                  <tr>
                    <Td className='att'>Continente</Td>
                    <Td className='data'>{country.continent}</Td>
                  </tr>
                  <tr>
                    <Td className='att'>Capital</Td>
                    <Td className='data'>{country.capital || 'Ninguno'}</Td>
                  </tr>
                  <tr>
                    <Td className='att'>Subregión</Td>
                    <Td className='data'>{country.subregion || 'Ninguno'}</Td>
                  </tr>
                  <tr>
                    <Td className='att'>Área</Td>
                    <Td className='data'>{country.area}</Td>
                  </tr>
                  <tr>
                    <Td className='att'>Población</Td>
                    <Td className='data'>{country.population}</Td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </CardsContainer>
          <H4>Actividades turísticas</H4>
          <CardsContainer>
            {country.activities?.length 
            ? country.activities.map((act, index) => (
              <Card key={index} style={{ width: '100%', display: 'flex', marginBottom: 10 }}>
                <H3 style={{ marginLeft: 20 }}>{act.name}</H3>
                <table style={{ tableLayout: 'auto', marginLeft: 50 }}>
                  <tbody>
                    <tr>
                      <Td className='att'>Temporada</Td>
                      <Td className='data'>{act.season}</Td>
                    </tr>
                    <tr>
                      <Td className='att'>Duración</Td>
                      <Td className='data'>{act.duration} horas</Td>
                    </tr>
                    <tr>
                      <Td className='att'>Dificultad</Td>
                      <Td className='data'>{act.difficulty}</Td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            ))
            : <NoResults text='Este país no tiene actividades turísticas.' />}
          </CardsContainer>
          </>
        ) : <CountrySkeleton />}
      </Layout>
    </>
  );
}
 
export default Country;