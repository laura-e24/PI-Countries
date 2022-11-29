import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams  } from 'react-router-dom'
import styled from 'styled-components'
import CountryCard from '../components/CountryCard';
import FilterAndSortBar from '../components/FilterAndSortBar';
import Pagination from '../components/Pagination';
import SideBar from '../components/SideBar';
import NoResults from '../components/NoResults';
import usePagination from '../hooks/usePagination';

import { getActivities, getCountries } from '../redux/actions';
import { sortArr } from '../utils';
import HomeSkeleton from '../components/HomeSkeleton';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 20px;
`

const MainContainer = styled.main`
  margin-top: 15px;
  width: 100%;
  height: 100vh;
`

const Home = () => {

  const dispatch  = useDispatch();
  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [isLoading, setIsLoading] = useState(false)

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
    const activitiesNames = country.Activities.map(a => a.name);

    // Si filtramos por sólo una opción, retornamos aquellos países
    // que contengan o el continente o la actividad filtrada
    if (!!filtering.values.length) 
      return filtering.values.some(v => activitiesNames.indexOf(v) >= 0) || filtering.values.includes(country.continent)

    //  En cambio, si filtramos tanto por continente como por actividad a la vez,
    // retorno aquellos países que contengan AMBAS características simultáneamente
    // else if (filtering.by.includes('activity') && filtering.by.includes('continent') && !!filtering.values.length) 
    //   return filtering.values.some(v => activitiesNames.indexOf(v) >= 0) && filtering.values.includes(country.continent)

    // Para evitar que el array se vacíe y no se renderice nada al no aplicar filtros,
    // debemos retornar el array sin modificar
    else return country
  }


  const sortedArr = sortArr(countries.filter(filterArr), sorting.order, sorting.by)

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const continents = [...new Set(countries.map(c => c.continent))];
  const activitiesNames = [...new Set(activities.map(c => c.name))];


  const { next, prev, jump, currentData, currentPage, pages } = usePagination(sortedArr)
  const sliceCountries = currentData()

  const filteringData = {
    continent: continents,
    activity: activitiesNames
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!name) setIsLoading(true)
      await dispatch(getCountries(name))
      await dispatch(getActivities())
      if (!name) setIsLoading(false)
    }
    fetchData()
  }, [name])
  
  return (  
    <MainContainer>
      <div style={{ width: '100%', display:'flex' }}>
        <div>
          <SideBar />
        </div>
        <div className='w-full'>
          <FilterAndSortBar 
            sorting={sorting}
            filtering={filtering}
            setSorting={setSorting}
            setFiltering={setFiltering}
            filteringData={filteringData}
          />
          {!isLoading ? (
            !!sliceCountries.length ? 
            <CardsContainer>
              {sliceCountries.map((country, i) => {
                return (
                  <CountryCard country={country} key={i} />
                )
              })}
            </CardsContainer>
            : <NoResults text={name && `No se encontraron resultados para "${name}"`} />
          ) : <HomeSkeleton />}
        </div>
      </div>
      {!!sliceCountries.length && (
        <Pagination 
          next={next}
          prev={prev}
          jump={jump}
          currentData={currentData}
          currentPage={currentPage}
          pages={pages}
        />
      )}
      <Outlet />
    </MainContainer>
  );
}
 
export default Home;