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

const Home = () => {

  const dispatch  = useDispatch();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const location = useLocation()

  const countries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [isLoading, setIsLoading] = useState(false)

  const { next, prev, jump, currentData, currentPage, pages } = usePagination(countries)
  const sliceCountries = currentData()

  useEffect(() => {
    const fetchData = async () => {
      if (!name) setIsLoading(true)
      await dispatch(getCountries(name))
      if (!name) setIsLoading(false)

      await dispatch(getActivities())
    }
    fetchData()
  }, [name, dispatch])

  const [sorting, setSorting] = useState({
    active: false,
    by: '',
    order: ''
  })

  const [filtering, setFiltering] = useState({
    active: false,
    activities: {
      active: false,
      values: []
    },
    continents: {
      active: false,
      values: []
    },
  })

  const handleSort = (active, by, order) => {
    const payload = {
      active,
      by,
      order
    }
    dispatch(sortCountries(payload))
  }

  const handleFilter = (active, ...other) => {
    const [continents, activities] = other
    const payload = {
      active,
      continents,
      activities,
    }
    dispatch(filterCountries(payload))
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
        handleSort={handleSort}
        handleFilter={handleFilter}
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