import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams  } from 'react-router-dom'
import CountryCard from '../components/CountryCard';
import FilterAndSortBar from '../components/FilterAndSortBar';
import NoResults from '../components/NoResults';
import usePagination from '../hooks/usePagination';

import { filterCountries, getActivities, getCountries, sortCountries } from '../redux/actions';
import HomeSkeleton from '../components/HomeSkeleton';
import Layout from '../layouts/Layout';
import CardsContainer from '../components/CardsContainer';
import { fetchAllCountries, filterCountriesByActivity, filterCountriesByContinent, selectAllCountries, selectAllCountriesStatus } from '../features/countries/countriesSlice';
import { selectAllActivities, selectAllActivitiesStatus } from '../features/activities/activitiesSlice';
import { EStateGeneric } from '../redux/types';

const Home = () => {
  const dispatch  = useDispatch();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const location = useLocation()

  const countries = useSelector(selectAllCountries);
  const countriesStatus = useSelector(selectAllCountriesStatus);
  const activities = useSelector(selectAllActivities);

  const { next, prev, jump, currentData, currentPage, pages } = usePagination(countries)
  const sliceCountries = currentData()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (countriesStatus === EStateGeneric.IDLE) {

  //       await dispatch(fetchAllCountries());
  //     }
  //   }
  //   fetchData()
  // }, [name, dispatch, countriesStatus])

  const [sorting, setSorting] = useState({
    active: false,
    by: '',
    order: ''
  })

  const [filtering, setFiltering] = useState({
    active: false,
    filterBy: [],
    activities: { values: [] },
    continents: { values: [] }
  })

  const handleSort = (active, by, order) => {
    const payload = {
      active,
      by,
      order
    }
    dispatch(sortCountries(payload))
  }

  const handleFilter = ({ continents, activities, filterBy, active }) => {

    const payload = {
      active,
      filterBy,
      continents,
      activities,
    }
    if (filterBy.includes("activity")) dispatch(filterCountriesByActivity(payload.activities))
    if (filterBy.includes("continent")) dispatch(filterCountriesByContinent(payload.continents))
  }

  const continents = [
    'South America',
    'North America',
    'Africa',
    'Asia',
    'Oceania',
    'Antarctica',
    'Europe',
  ];
  const activitiesNames = [...new Set(activities.map(c => c.name))];

  const filteringData = {
    continents: continents,
    activities: activitiesNames
  }

  return (  
    <Layout 
      next={next}
      prev={prev}
      jump={jump}
      currentData={currentData}
      currentPage={currentPage}
      pages={pages}
      showPagination={location.pathname.includes('home')}
     >
      <FilterAndSortBar 
        sorting={sorting}
        filtering={filtering}
        setSorting={setSorting}
        setFiltering={setFiltering}
        filteringData={filteringData}
        handleSort={{}}
        handleFilter={handleFilter}
      />
      {countriesStatus === EStateGeneric.SUCCEEDED ? (
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
