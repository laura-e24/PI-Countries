import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams  } from 'react-router-dom'
import styled from 'styled-components'
import CountryCard from '../components/CountryCard';
import FilterAndSortBar from '../components/FilterAndSortBar';
import Pagination from '../components/Pagination';
import SideBar from '../components/SideBar';
import usePagination from '../hooks/usePagination';

import { getActivities, getCountries } from '../redux/actions';
import { sortArr } from '../utils';



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
  display: flex;
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
      await dispatch(getCountries(name))
      await dispatch(getActivities())
    }
    fetchData()
  }, [name])

  return (  
    <MainContainer>
        <SideBar />
      <div>
        <FilterAndSortBar 
          sorting={sorting}
          filtering={filtering}
          setSorting={setSorting}
          setFiltering={setFiltering}
          filteringData={filteringData}
        />
        <CardsContainer>
          {sliceCountries.map((country, i) => {
            return (
              <CountryCard country={country} key={i} />
            )
          })}
        </CardsContainer>
      </div>
        {/* <Pagination 
          next={next}
          prev={prev}
          jump={jump}
          currentData={currentData}
          currentPage={currentPage}
          pages={pages}
        /> */}
      <Outlet />
    </MainContainer>
  );
}
 
export default Home;