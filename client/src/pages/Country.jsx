import { useParams } from 'react-router-dom'


const Country = () => {

  const params = useParams();
  const { countryId } = params;

  return (  
    <main>
      <h1>Henry Countries --- {countryId}</h1>
    </main>
  );
}
 
export default Country;