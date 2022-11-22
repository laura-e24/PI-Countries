import { useSearchParams  } from 'react-router-dom'

const Home = () => {

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (  
    <main>
      <h1>Henry Countries --- HOME --- {
        name && <span>{name}</span>
      }</h1>
    </main>
  );
}
 
export default Home;