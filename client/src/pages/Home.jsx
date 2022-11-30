import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams  } from 'react-router-dom'
import CountryCard from '../components/CountryCard';
import FilterAndSortBar from '../components/FilterAndSortBar';
import NoResults from '../components/NoResults';
import usePagination from '../hooks/usePagination';

import { getActivities, getCountries } from '../redux/actions';
import { sortArr } from '../utils';
import HomeSkeleton from '../components/HomeSkeleton';
import Layout from '../layouts/Layout';
import CardsContainer from '../components/CardsContainer';

const Home = () => {

  const dispatch  = useDispatch();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const location = useLocation()

  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!name) setIsLoading(true)
      await dispatch(getCountries(name))
      await dispatch(getActivities())
      if (!name) setIsLoading(false)
    }
    fetchData()
  }, [name])

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


  const continents = [...new Set(countries.map(c => c.continent))];
  const activitiesNames = [...new Set(activities.map(c => c.name))];


  const { next, prev, jump, currentData, currentPage, pages } = usePagination(sortedArr)
  const sliceCountries = currentData()

  const filteringData = {
    continent: continents,
    activity: activitiesNames
  }

  return (  
    <Layout 
      next={next}
      prev={prev}
      jump={jump}
      currentData={currentData}
      currentPage={currentPage}
      pages={pages}
      showPagination={!!sliceCountries.length && location.pathname.includes('home')}
     >
      <FilterAndSortBar 
        sorting={sorting}
        filtering={filtering}
        setSorting={setSorting}
        setFiltering={setFiltering}
        filteringData={filteringData}
      />
      {!isLoading ? (
        !!sliceCountries.length ? (
          <CardsContainer>
            {sliceCountries.map((country, i) => {
              return (
                <CountryCard country={country} key={i} />
              )
            })}
          </CardsContainer>
        ) : <NoResults text={name && `No se han encontrado resultados para "${name}"`} />
      ) : <HomeSkeleton />}
    </Layout>
  );
}
 
export default Home;