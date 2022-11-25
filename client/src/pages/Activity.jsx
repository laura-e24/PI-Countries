import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { ButtonComponent } from '../components/GenericButton';
import CustomInput from '../components/CustomInput';
import SideBar from '../components/SideBar';

import { createActivity, getCountries } from "../redux/actions";
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
  ${({ disabled }) => disabled && `
  background-color: rgb(148, 146, 146, 0.5);
  color: black;
  box-shadow: none;
  cursor: default;
  opacity: 75%
  &:hover {
    background-color: none;
  }
  `}
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

const ErrorMessage = styled.span`
  color: rgba(211, 16, 39);
  font-weight: 300;
`

const Activity = () => {

  const dispatch  = useDispatch();
  const countries = useSelector((state) => state.countries);


  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: ""
  })

  const [values, setValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: []
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const handleError = e => {

    const errorsMsg = {
      name: 'Nombre requerido.',
      difficulty: 'Dificultad requerida.',
      duration: 'Duración requerida.',
      season: 'Temporada requerida.',
      countries: 'País(es) requerido(s).'
    }

    if (!values[e.target.name] || (!values[e.target.name].length)) {
      setErrors({
        ...errors,
        [e.target.name]: errorsMsg[e.target.name]
      })
    }
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
                <span>
                  <CustomInput 
                    errors={errors}
                    label='Nombre'
                    name='name'
                    placeholder='Nombre...'
                    value={values.name} 
                    onChange={handleChange}
                    onBlur={handleError}
                  />
                  <ErrorMessage>{errors.name}</ErrorMessage>
                </span>
                <span>
                  <CustomInput 
                    errors={errors}
                    label='Dificultad'
                    type='number' 
                    name='difficulty' 
                    placeholder='Dificultad...'
                    value={values.difficulty} 
                    onChange={handleChange}  
                    onBlur={handleError}
                  />
                  <ErrorMessage>{errors.difficulty}</ErrorMessage>
                </span>
                <span>
                  <CustomInput 
                    errors={errors}
                    label='Duración'
                    name='duration' 
                    placeholder='Duración...'
                    value={values.duration} 
                    onChange={handleChange}  
                    onBlur={handleError}
                  />
                  <ErrorMessage>{errors.duration}</ErrorMessage>
                </span>
                <span>
                  <CustomInput 
                    errors={errors}
                    label='Temporada'
                    name='season' 
                    placeholder='Temporada...'
                    value={values.season} 
                    onChange={handleChange}  
                    onBlur={handleError}
                  />
                  <ErrorMessage>{errors.season}</ErrorMessage>
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <span>
                  <CustomSelect 
                    errors={errors}
                    label='Países' 
                    name='countries' 
                    onBlur={handleError}
                    onChange={e => {
                      setValues({
                        ...values,
                        countries: values.countries?.concat(countries.find(c => c.id === e.target.value))
                      })
                      if (errors.countries.length) {
                        setErrors({
                          ...errors,
                          countries: ''
                        })
                      }
                    }}
                  >
                    <option value="">...</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </CustomSelect>
                  <ErrorMessage>{errors.countries}</ErrorMessage>
                </span>
                <div style={{ display:'flex',  flexWrap: 'wrap',  marginTop: 15, marginLeft: 10  }}>
                  {values.countries && values.countries.map((c, i) => (
                    <div style={{ display: 'flex' }} key={i}>
                      <p style={{  fontWeight: 700, color: '#818181', paddingBottom: 0  }}>{c.name}</p>
                      <RemoveButton onClick={() => removeCountryOption(c.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 50 50" overflow="visible" stroke="black" strokeWidth="10" strokeLinecap="round">
                          <line x2="50" y2="50" strokeWidth="5"/>
                          <line x1="50" y2="50" strokeWidth="5"/>
                        </svg>
                      </RemoveButton>
                    </div>
                  ))}
                </div>
              </div>
              <div id='button'>
                <Button disabled={Object.values(values).some(e => !e || !e.length)}>
                  Crear ✏️
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </MainContainer>
    </>
  );
}
 
export default Activity;