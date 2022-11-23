import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams  } from 'react-router-dom'
import styled from 'styled-components'
import usePagination from '../hooks/usePagination';

import { getActivities, getCountries } from '../redux/actions';
import { sortArr } from '../utils';

const Pagination = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 20px;
  background-color: blue;
  font-size: 20px;
`

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 60px 0;
`

const CountryCard = styled.div`
  padding: 20px;
  background-color: red;
  border-radius: 15px;
`

const SearchBar = styled.div`
  padding: 20px;
  background-color: purple;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Home = () => {

  const dispatch  = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [sorting, setSorting] = useState({
    active: false,
    by: '',
    order: ''
  })

  const [filtering, setFiltering] = useState({
    active: false,
    by: [],
    values: []
  })

  const filterArr = country => {
    const names = country.Activities.map(a => a.name);

    if (filtering.by.length === 1) 
      return filtering.values.some(v => names.indexOf(v) >= 0) || filtering.values.includes(country.continent)

    else if (filtering.by.length > 1) 
      return filtering.values.some(v => names.indexOf(v) >= 0) && filtering.values.includes(country.continent)

    else return country
  }
  const sortedArr = sortArr(countries.filter(filterArr), sorting.order, sorting.by)

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { next, prev, jump, currentData, currentPage, pages } = usePagination(sortedArr)
  const continents = [...new Set(countries.map(c => c.continent))];
  const activitiesNames = activities.map(c => c.name);

  const sliceCountries = currentData()

  const filteringData = {
    continent: continents,
    activity: activitiesNames
  }

  const [search, setSearch] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await  dispatch(getCountries(search))
    console.log(response)
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCountries(name))
      await dispatch(getActivities())
    }
    fetchData()
  }, [name])

  return (  
    <main>
      <SearchBar>
        <form onSubmit={handleSubmit}>
          <input value={search} placeholder='buscar pais' onChange={e => setSearch(e.target.value)} />
          <button type='submit'>BUSCAR</button>
        </form>
        <div>
          <button onClick={() => setSorting({ ...sorting, active: true })}>
            Ordenar
          </button>
          {sorting.active && (
            <select 
              name="orderBy" 
              onChange={e => setSorting({ ...sorting, by: e.target.value})}
            >
              <option value="">...</option>
              <option value="population">Población</option>
              <option value="name">Nombre</option>
            </select>
          )}
          {sorting.by && (
            <select 
              onChange={e => setSorting({ ...sorting, order: e.target.value })} 
              name="orderAs"
            >
              <option value="">...</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          )}
          <button onClick={() => setFiltering({ ...filtering, active: true })}>Filtrar</button>
          {filtering.active && (
            <select 
              onChange={(e) => setFiltering({ ...filtering, by: filtering.by.concat(e.target.value) })} 
              name="filterBy"
            >
              <option value="">...</option>
              <option value="continent">Continente</option>
              <option value="activity">Actividad turística</option>
            </select>
          )}
          {filtering.by.map((f, i) => (
            <select 
              key={i}
              onChange={(e) => setFiltering({ ...filtering, values: filtering.values.concat(e.target.value) })} 
              name={f}
            >
              <option value="">...</option>
              {filteringData[f].map((data, index) => (
                <option key={index} value={data}>{data}</option>
              ))}
            </select>
          ))}
        </div>
      </SearchBar>
      <CardsContainer>
        {sliceCountries.map((c, i) => {
          return (
            <CountryCard key={i}>
              <img src={c.imgFlag} />
              <span>
                <p>{c.name}</p>
                <p>{c.continent}</p>
              </span>
              <button type='button'>
                Detalles
              </button>
            </CountryCard>
          )
        })}
      </CardsContainer>
      <Pagination>
        <button onClick={() => prev()}>{"<"}</button>
        {new Array(pages).fill(0).map((_, index) => {
          return (
            <p key={index} onClick={() => jump(index+1)} style={index + 1 === currentPage ? {color: 'red', backgroundColor: 'purple', padding: '2rem'} : {}}>
              {index + 1}
            </p>
          )
        })}
        <button onClick={() => next()}>{">"}</button>
      </Pagination>
      <Outlet />
    </main>
  );
}
 
export default Home;