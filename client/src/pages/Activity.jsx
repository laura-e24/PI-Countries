import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Toast from '../components/Toast';
import ActivityForm from '../components/ActivityForm';

const Card = styled.div`
  padding: 20px;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const H2 = styled.h2`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 10px
`

const Activity = ({ operation = "create" }) => {
  const [toastify, setToastify] = useState({
    display: false,
    type: '',
    text: ''
  })

  return (
    <>
      <Layout>
        <H2>{operation === "create" ? "Crear " : "Editar"} actividad</H2>
        <Card>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <ActivityForm setToastify={setToastify} type={operation} />
            <img alt='activity' src='/activity.png' width={300} className='my-auto' />
          </div>
        </Card>
      </Layout>
      {toastify.display && <Toast toastify={toastify} setToastify={setToastify} />} 
    </>
  );
}
 
export default Activity;