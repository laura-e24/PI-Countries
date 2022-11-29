import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { cleanUpState, getOneCountry } from '../redux/actions';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SideBar from '../components/SideBar';
import NoResults from '../components/NoResults';
import CountrySkeleton from '../components/CountrySkeleton';

const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`
const CardsContainer = styled.div`
  justify-content: center;
  margin-right: 20px;
`

const Card = styled.div`
  padding: 10px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  margin-bottom: 10px;
  display: flex;
  width: 100%;
`

const Country = () => {

  const dispatch  = useDispatch();
  const country = useSelector((state) => state.country);
  const params = useParams();
  const { countryId } = params;
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await dispatch(getOneCountry(countryId))
      setIsLoading(false)
    }
    fetchData()
    return () => dispatch(cleanUpState())
  }, [countryId])

  return (  
    <>
      <style>
        {`
          h2 {
            font-size: 35px;
            font-weight: 700;
            margin-bottom: 10px
          }
          h3 {
            font-size: 25px;
            font-weight: 600;
            margin-bottom: 5px;
            display: inline-block;
          }
          h4 {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 5px
          }
          #spanId {
            color: #818181;
            font-weight: 400;
            font-size: 25px
          }
          td {
            margin-top: 15px;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 20px
          }
          .att {
            font-weight: 600
          }
          .data {
            color: #818181;
          }
        `}
      </style>
      <MainContainer>
        <div style={{  marginTop: 'auto', marginBottom: 'auto' }}>
          <SideBar />
        </div>
        <div style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
          {!isLoading ? (
            <>
            <h2>{country.name} &nbsp;<span id='spanId'>({countryId})</span></h2>
            <CardsContainer>
              <Card>
                <img src={country.imgFlag} alt={`${country.name}-flag`} height={115} style={{ padding: 15, marginLeft: 10 }} />
                <table style={{ tableLayout: 'auto', marginLeft: 50 }}>
                  <tbody>
                    <tr>
                      <td className='att'>Continente</td>
                      <td className='data'>{country.continent}</td>
                    </tr>
                    <tr>
                      <td className='att'>Capital</td>
                      <td className='data'>{country.capital || 'Ninguno'}</td>
                    </tr>
                    <tr>
                      <td className='att'>Subregión</td>
                      <td className='data'>{country.subregion || 'Ninguno'}</td>
                    </tr>
                    <tr>
                      <td className='att'>Área</td>
                      <td className='data'>{country.area}</td>
                    </tr>
                    <tr>
                      <td className='att'>Población</td>
                      <td className='data'>{country.population}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </CardsContainer>
            <h4>Actividades turísticas</h4>
            <CardsContainer>
              {country.activities?.length 
              ? country.activities.map((act, index) => (
                <Card key={index}>
                  <h3 style={{ marginLeft: 20 }}>{act.name}</h3>
                  <table style={{ tableLayout: 'auto', marginLeft: 50 }}>
                    <tbody>
                      <tr>
                        <td className='att'>Temporada</td>
                        <td className='data'>{act.season}</td>
                      </tr>
                      <tr>
                        <td className='att'>Duración</td>
                        <td className='data'>{act.duration}</td>
                      </tr>
                      <tr>
                        <td className='att'>Dificultad</td>
                        <td className='data'>{act.difficulty}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              ))
              : <NoResults text='Este país no tiene actividades turísticas.' />}
            </CardsContainer>
            </>
          ) : <CountrySkeleton />}
        </div>
      </MainContainer>
    </>
  );
}
 
export default Country;