import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import NoResults from '../components/NoResults';
import Layout from '../layouts/Layout';
import FAIcon from '../components/FAIcon';
import { deleteActivity, disableActivity, fetchAllActivities, restoreActivity, selectAllActivities, selectAllActivitiesStatus } from '../features/activities/activitiesSlice';
import { EStateGeneric } from '../redux/types';
import ActivitiesSkeleton from '../components/ActivitiesSkeleton';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const CardsContainer = styled.div`
  justify-content: center;
  margin-right: 20px;
`
const Card = styled.div`
  padding: 20px 0;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const H3 = styled.h3`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 5px;
  display: inline-block;
  max-width: 50%;
  word-wrap: break-word;
`

const Td = styled.td`
  margin-top: 15px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 20px
`

const Button = styled.button`
  background: none;
	border: none;
	outline: inherit;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 9999px;
  padding: 0.5rem;
  ${({ btnType }) => btnType === "disable" ? `
    &:hover {
      border-color: #989694;
      border-opacity: 50%;
    }
  ` : btnType === "remove" ? `
    &:hover {
      border-color: #B5081A;
      border-opacity: 50%;
    }
  ` : btnType === "edit" ? `
    &:hover {
      border-color: #F56B07;
      border-opacity: 50%;
    }
  ` : `
    &:hover {
      background-color: #d8d7d7;
    }
    display: flex;
      border-color: #989694;
      border-opacity: 50%;
      border-radius: 6px;
      color: #989694
  `}
`

const CreateButton = styled.a`
  background: none;
	border: none;
	outline: inherit;
  cursor: pointer;
  border: 1px solid #8278D7;
  color: #8278D7;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 13px;
  &:hover {
    background-color: #dad7f3;
  }
`

const Activities = () => {
  const dispatch  = useDispatch();
  const activities = useSelector(selectAllActivities);
  const activitiesStatus = useSelector(selectAllActivitiesStatus);

  let navigate = useNavigate();

  useEffect(() => {
    //const fetchData = async () => {
    if (activitiesStatus === EStateGeneric.IDLE) {
      dispatch(fetchAllActivities())
    }
      
    //}
    //fetchData()
  }, [dispatch, activitiesStatus])

  return (  
    <>
      <style>
        {`
          #spanId {
            color: #818181;
            font-weight: 400;
            font-size: 25px
          }
          .att {
            font-weight: 600
          }
          .data {
            color: #818181;
          }
          .my-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
        `}
      </style>
      <Layout>
      {activitiesStatus !== EStateGeneric.PENDING ? (
        <>
        <CardsContainer>
          <div className='my-2'>
            <CreateButton href='/activities/create'>Crear actividad</CreateButton>
          </div>
          {activities?.length 
          ? activities.map((act, index) => (
            <div key={act.id} style={{marginBottom: 16}}>
              <div className='flex space-x-2 my-2'>
               {!!act.deletedAt ? (
               <>
               <Button
                  onClick={() => dispatch(restoreActivity(act))}
                  btnType="restore" 
                  type='button'
                >
                
                  <FAIcon size='sm' type='light' color="#989694" name="eye" />
                  <span style={{ marginLeft: 10 }} className='block'>
                    Habilitar
                  </span>
                </Button>
               </>
               ) : (
                <>
                <Button
                  onClick={() => dispatch(disableActivity(act.id))}
                  btnType="disable" 
                  type='button'
                >
                  <FAIcon size='sm' type='light' color="#989694" name="eye-slash" />
                </Button>
                <Button 
                  onClick={() => dispatch(deleteActivity(act.id))}
                  btnType="remove" 
                  type='button'
                >
                  <FAIcon size='sm' type='light' color="#B5081A" name="trash-xmark" />
                </Button>
                <Button 
                  btnType="edit" 
                  type='button'
                  onClick={() => navigate(`/activities/${act.id}`)}
                >
                  <FAIcon size='sm' type='light' color="#F56B07" name="pen-swirl" />
                </Button>
                </>
               )}
              </div>
              <Card 
                key={index} 
                style={!!act.deletedAt 
                  ? { width: '100%', marginBottom: 10, opacity: "30%", paddingRight: 20, paddingLeft: 20, userSelect: "none" } 
                  : { width: '100%', marginBottom: 10, paddingRight: 20, paddingLeft: 20 }
                }
              >
                <div className='flex w-full justify-between space-x-4'>
                  <H3 style={{ marginTop: "auto", marginBottom: "auto" }}>{act.name}</H3>
                  <div className='my-auto flex flex-wrap' style={{maxWidth: "50%", paddingLeft: 30}}>
                    {act.countries?.map(c => <img className='my-auto' key={c.id} style={{borderRadius: 4, marginRight: 8, marginBottom: 8}} src={c.imgFlag} width={33} />)}
                  </div>
                </div>
                <table className='w-full' style={{ tableLayout: 'auto', paddingTop: 15, marginTop: 15, borderTop: "1px solid #d9d9d9" }}>
                  <tbody>
                    <tr>
                      <Td className='att'>Temporada</Td>
                      <Td className='data'>{act.season}</Td>
                    </tr>
                    <tr>
                      <Td className='att'>Duración</Td>
                      <Td className='data'>{act.duration} horas</Td>
                    </tr>
                    <tr>
                      <Td className='att'>Dificultad</Td>
                      <Td className='data'>{act.difficulty}</Td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          ))
          : <NoResults text='No hay actividades turísticas.' />}
        </CardsContainer>
        </>
        ) : <ActivitiesSkeleton />}
      </Layout>
      <ToastContainer />
    </>
  );
}
 
export default Activities;