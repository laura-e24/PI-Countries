import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { ButtonComponent } from '../components/GenericButton';
import CustomInput from '../components/CustomInput';
import SideBar from '../components/SideBar';

import { createActivity, getActivities, getCountries } from "../redux/actions";
import CustomSelect from '../components/CustomSelect';

const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`

const Card = styled.div`
  padding: 20px;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const Button = styled(ButtonComponent)`
  margin-top: 20px;
`
const RemoveButton = styled.div`
  display: inline;
  margin: 15px 20px auto 15px;
  padding: 4px 8px;
  border-radius: 999px;
	border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(217, 217, 217, 0.75);
  }
`

const Activity = () => {

  const dispatch  = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [values, setValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: ""
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await  dispatch(createActivity(values))
    console.log(response)
  }

  const removeCountryOption = id => {
    setValues({
      ...values,
      countries: values.countries.filter(c => c.id !== id)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCountries())
    }
    fetchData()
  }, [])

  return (
    <>
      <style>
        {`
          h2 {
            font-size: 35px;
            font-weight: 700;
            margin-bottom: 10px
          }
          #button {
            grid-column: span 2 / span 2;
          }
          #grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            max-width: 50%
          }
        `}
      </style>
      <MainContainer>
        <div className='my-auto'>
          <SideBar />
        </div>
        <div className='w-full' style={{ marginRight: 20 }}>
          <h2>Crear actividad</h2>
          <Card>
            <form onSubmit={handleSubmit}>
              <div id='grid'>
                <CustomInput 
                  label='Nombre'
                  name='name' 
                  value={values.name} 
                  onChange={handleChange}  
                />
                <CustomInput 
                  label='Dificultad'
                  type='number' 
                  name='difficulty' 
                  value={values.difficulty} 
                  onChange={handleChange}  
                />
                <CustomInput 
                  label='Duración'
                  name='duration' 
                  value={values.duration} 
                  onChange={handleChange}  
                />
                <CustomInput 
                  label='Temporada'
                  name='season' 
                  value={values.season} 
                  onChange={handleChange}  
                />
              </div>
              <div style={{ display: 'flex'}}>
                <CustomSelect 
                  label='Países' 
                  name='countries' 
                  onChange={e => setValues({
                    ...values,
                    countries: values.countries.concat(countries.find(c => c.id === e.target.value))
                  })}
                >
                  <option value="">...</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                  ))}
                </CustomSelect>
                <div style={{ display:'flex',  flexWrap: 'wrap',  marginTop: 15, marginLeft: 10  }}>
                  {values.countries && values.countries.map((c, i) => (
                    <div style={{ display: 'flex' }} key={i}>
                      <p style={{  fontWeight: 700, color: '#818181', paddingBottom: 0  }}>{c.name}</p>
                      <RemoveButton onClick={() => removeCountryOption(c.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 50 50" overflow="visible" stroke="black" stroke-width="10" stroke-linecap="round">
                          <line x2="50" y2="50" stroke-width="5"/>
                          <line x1="50" y2="50" stroke-width="5"/>
                        </svg>
                      </RemoveButton>
                    </div>
                  ))}
                </div>
              </div>
              <div id='button'>
                <Button>Crear ✏️</Button>
              </div>
            </form>
          </Card>
        </div>
      </MainContainer>
    </>
  );
}
 
export default Activity;