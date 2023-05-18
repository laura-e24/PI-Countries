import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams  } from 'react-router-dom'
import CountryCard from '../components/CountryCard';
import FilterAndSortBar from '../components/FilterAndSortBar';
import NoResults from '../components/NoResults';
import usePagination from '../hooks/usePagination';
import HomeSkeleton from '../components/HomeSkeleton';
import Layout from '../layouts/Layout';
import CardsContainer from '../components/CardsContainer';
import { fetchAllCountries, filterCountriesByActivity, filterCountriesByContinent, selectAllCountries, selectAllCountriesStatus, sortCountriesByName, sortCountriesByPopulation } from '../features/countries/countriesSlice';
import { selectAllActivities } from '../features/activities/activitiesSlice';
import { EStateGeneric } from '../redux/types';

const Home = () => {
  const dispatch  = useDispatch();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const location = useLocation()

  const countries = useSelector(selectAllCountries);
  const countriesStatus = useSelector(selectAllCountriesStatus);
  const activities = useSelector(selectAllActivities);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchAllCountries(name))
    }
    fetchData()
  }, [name, dispatch])
  

  const { next, prev, jump, currentData, currentPage, pages } = usePagination(countries)
  const sliceCountries = currentData()

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

  const handleSort = (by, order) => {
    const payload = {
      by,
      order
    }

    if (by === "name")
      dispatch(sortCountriesByName(payload.order))
    else
      dispatch(sortCountriesByPopulation(payload.order))
  }

  const handleFilter = ({ continents, activities, filterBy }) => {

    const payload = {
      filterBy,
      continents,
      activities,
    }

    if (filterBy.includes("activities")) dispatch(filterCountriesByActivity(payload.activities))
    if (filterBy.includes("continents")) dispatch(filterCountriesByContinent(payload.continents))
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
  const activitiesNames = [...new Set(activities
    .filter(act => !act.deletedAt)
    .map(c => c.name))];

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
        handleSort={handleSort}
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
