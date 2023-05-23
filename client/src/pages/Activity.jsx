import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import ActivityForm from '../components/ActivityForm';
import { ToastContainer } from 'react-toastify';

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

  return (
    <>
      <Layout>
        <H2>{operation === "create" ? "Crear " : "Editar"} actividad</H2>
        <Card>
          <div style={{display:'flex', justifyContent: 'space-between', width: '100%'}}>
            <ActivityForm type={operation} />
            <img alt='activity' src='/activity.png' width={300} className='my-auto' />
          </div>
        </Card>
      </Layout>
      <ToastContainer />
    </>
  );
}
 
export default Activity;