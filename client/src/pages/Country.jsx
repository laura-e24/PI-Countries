import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getOneCountry } from '../redux/actions';
import { useEffect } from 'react';

const Country = () => {

  const dispatch  = useDispatch();
  const country = useSelector((state) => state.country);
  const params = useParams();
  const { countryId } = params;
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOneCountry(countryId))
    }
    fetchData()
  }, [countryId])
console.log(country)
  return (  
    <main>
      <h1>Henry One Country: {countryId}</h1>
    </main>
  );
}
 
export default Country;