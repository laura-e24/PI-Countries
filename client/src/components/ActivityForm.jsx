import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { capitalize, sortArr } from "../utils";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { ButtonComponent } from '../components/GenericButton';
import { useParams } from "react-router-dom";
import * as _ from "lodash";
import { cleanUpState, createActivity, fetchOneActivity, selectOneActivity, selectOneActivityStatus, updateActivity } from "../features/activities/activitiesSlice";
import { fetchAllCountries, selectAllCountries, selectAllCountriesStatus } from "../features/countries/countriesSlice";
import { EStateGeneric } from "../redux/types";
import ActivitySkeleton from "./ActivitySkeleton";


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

const ActivityForm = ({ type = "create" }) => {

  const dispatch  = useDispatch();
  const params = useParams();
  const { activityId } = params;
  const countries = useSelector(selectAllCountries);
  const countriesStatus = useSelector(selectAllCountriesStatus);
  const activity = useSelector(selectOneActivity);
  const activityStatus = useSelector(selectOneActivityStatus);

  useEffect(() => {
    const fetchData = async () => {
      if (type === "edit") await dispatch(fetchOneActivity(activityId))
      if (countriesStatus === EStateGeneric.IDLE) await dispatch(fetchAllCountries())
    }
    if (type === "create" || activityStatus === EStateGeneric.IDLE || activity.id !== activityId)
      fetchData();
  }, []);

  const [values, setValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: []
  })

  useEffect(() => {
    if (type === "edit") {
      const newValues = {
        name: activity?.name,
        difficulty: activity?.difficulty,
        duration: activity?.duration,
        season: activity?.season,
        countries: activity?.countries
      };
  
      setValues(newValues);
    }
  }, [activity?.id])

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: ""
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


    if (values.difficulty && (values.difficulty < 1 || values.difficulty > 5)) {
      setErrors({
        ...errors,
        difficulty: 'La dificultad debe ser entre 1 y 5.'
      })
    }

    if (values.duration && (values.duration < 1 || values.duration > 24)) {
      setErrors({
        ...errors,
        duration: 'La duración debe ser entre 1 y 24 horas.'
      })
    }

    if (!values[e.target.name] || (typeof values[e.target.name] === "object" && !values[e.target.name].length)) {
      setErrors({
        ...errors,
        [e.target.name]: errorsMsg[e.target.name]
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const activity = {
      ...values,
      id: activityId,
      name: capitalize(values.name.toLocaleLowerCase())
    }

    type === "create" 
    ? await  dispatch(createActivity(activity)) 
    : await  dispatch(updateActivity(activity))
  }

  const removeCountryOption = id => {
    setValues({
      ...values,
      countries: values.countries.filter(c => c.id !== id)
    })
  }

  const isDisabled = (values && Object.values(values).some(val => {
    return !val || (typeof val === "object" && !val.length)
  })) || Object.values(errors).some(err => !!err)

  return (  
    <>
     <style>
      {`
        #button {
          grid-column: span 2 / span 2;
        }
      `}
    </style>
    {type === "create" || activityStatus === EStateGeneric.SUCCEEDED ? (
      <Form onSubmit={handleSubmit}>
        <div style={{ paddingRight: 20}}>
          <CustomInput 
            errors={errors}
            label='Nombre'
            name='name'
            placeholder='Nombre...'
            value={values?.name} 
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
            value={values?.difficulty} 
            onChange={handleChange}  
            onBlur={handleError}
          />
          <ErrorMessage>{errors.difficulty}</ErrorMessage>
        </div>
        <div style={{ paddingRight: 20}}>
          <CustomInput 
            type='number' 
            errors={errors}
            label='Duración'
            name='duration' 
            placeholder='Duración...'
            value={values?.duration} 
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
            defaultValue={values.season}
          >
            <option value="" >Seleccionar...</option>
            <option value='Otoño' >Otoño</option>
            <option value='Invierno' >Invierno</option>
            <option value='Primavera'>Primavera</option>
            <option value='Verano' >Verano</option>
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
                countries: values?.countries?.concat(countries.find(c => c.id == e.target.value))
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
            {sortArr(countries.slice(), "asc", "name")?.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </CustomSelect>
          <ErrorMessage>{errors.countries}</ErrorMessage>
        </div>
        <div style={{ display:'flex',  flexWrap: 'wrap',marginLeft: 10  }}>
          {!!values?.countries?.length && [...new Set(values?.countries)].map((c, i) => (
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
          <Button disabled={isDisabled}>
            {type === "create" ? "Crear" : "Editar"} ✏️
          </Button>
        </div>
      </Form>
    ) : <ActivitySkeleton />}
    </>
  );
}
 
export default ActivityForm;
