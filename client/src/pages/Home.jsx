import { useEffect, useState } from 'react';
import { Outlet, useSearchParams  } from 'react-router-dom'
import axios from "axios"

const Home = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        name
        ? `http://localhost:3001/countries?name=${name}`
        : `http://localhost:3001/countries`
      )
      console.log(response)
    }
    fetchData()
  }, [])

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