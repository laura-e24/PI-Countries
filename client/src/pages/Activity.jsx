import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { ButtonComponent } from '../components/GenericButton';
import CustomInput from '../components/CustomInput';
import Layout from '../layouts/Layout';

import { createActivity, getCountries } from "../redux/actions";
import CustomSelect from '../components/CustomSelect';
import Loading from '../components/Loading';
import { capitalize, sortArr } from '../utils';
import Toast from '../components/Toast';

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
  margin: auto 10px;
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

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  width: 60%
`

const H2 = styled.h2`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 10px
`

const Activity = () => {

  const dispatch  = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [isLoading, setIsLoading] = useState(false)
  const [toastify, setToastify] = useState({
    display: false,
    type: '',
    text: ''
  })


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

    if (values.difficulty < 1 || values.difficulty > 5) {
      setErrors({
        ...errors,
        difficulty: 'La dificultad debe ser entre 1 y 5.'
      })
    }
    
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const activity = {
      ...values,
      name: capitalize(values.name.toLocaleLowerCase())
    }

    try {
      setIsLoading(true)
      const response = await  dispatch(createActivity(activity))
      setIsLoading(false)
      setToastify({
        display: true, 
        type: 'success',
        text: '¡Actividad creada con éxito!'
      })
      console.log(response)
    } catch (error) {
      console.log(error.response)
      setIsLoading(false)
      setToastify({
        display: true, 
        type: 'error',
        text: error.response.data.message
      })
    }
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
  }, [dispatch])

  return (
    <>
      <style>
        {`
          #button {
            grid-column: span 2 / span 2;
          }
        `}
      </style>
      <Layout>
        <H2>Crear actividad</H2>
        <Card>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <Form onSubmit={handleSubmit}>
                <div style={{ paddingRight: 20}}>
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
                </div>
                <div style={{paddingRight: 20}}>
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
                </div>
                <div style={{ paddingRight: 20}}>
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
                </div>
                <div style={{ paddingRight: 20}}>
                  <CustomSelect 
                    errors={errors}
                    label='Temporada' 
                    name='season' 
                    onBlur={handleError}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value='Otoño'>Otoño</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Primavera'>Primavera</option>
                    <option value='Verano'>Verano</option>
                  </CustomSelect>
                  <ErrorMessage>{errors.season}</ErrorMessage>
                </div>
                <div style={{  gridColumn: 'span 2 / span 2'}}>
                <div style={{ paddingRight: 25,width: '50%'}}>
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
                    <option value="">Seleccionar...</option>
                    {sortArr(countries, 'asc', 'name').map((country) => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </CustomSelect>
                  <ErrorMessage>{errors.countries}</ErrorMessage>
                </div>
                <div style={{ display:'flex',  flexWrap: 'wrap',marginLeft: 10  }}>
                  {values.countries && [...new Set(values.countries)].map((c, i) => (
                    <div style={{ display: 'flex' }} key={i}>
                      <p className='my-auto' style={{  fontWeight: 700, color: '#818181', paddingBottom: 0 }}>{c.name}</p>
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
                <Button disabled={Object.values(values).some(e => !e || !e.length) || Object.values(errors).some(e => e)}>
                  Crear ✏️
                </Button>
              </div>
            </Form>
            <img alt='activity' src='/activity.png' width={300} className='my-auto' />
          </div>
        </Card>
      </Layout>
      {isLoading && <Loading text='Creando actividad...' />}
      {toastify.display && <Toast toastify={toastify} setToastify={setToastify} />} 
    </>
  );
}
 
export default Activity;