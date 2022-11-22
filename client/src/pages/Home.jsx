import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams  } from 'react-router-dom'

import { getCountries } from '../redux/actions';

const Home = () => {

  const dispatch  = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCountries(name))
    }
    fetchData()
  }, [name])
console.log(countries)
  return (  
    <main>
      <h1>Henry Countries --- HOME --- {
        name && <span>{name}</span>
      }</h1>
      <Outlet />
    </main>
  );
}
 
export default Home;