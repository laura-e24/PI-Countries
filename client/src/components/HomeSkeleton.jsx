import styled from "styled-components";

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 20px;
`

const Card = styled.div`
  padding: 20px;
  background-color: rgba(237, 236, 236, 1);
  border-radius: 15px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const Skeleton = styled.div`
  background-color: rgba(129, 129, 129, 0.2);
  border-radius: 8px;
  width: 100%;
  height: 100px;
`

const TextSkeleton = styled(Skeleton)`
  width: calc(100% - 30px);
  border-radius: 5px;
  height: 15px;
  margin: 10px auto;
`

const BtnSkeleton = styled(Skeleton)`
  border-radius: 5px;
  height: 40px;
  margin-top: 15px
`

const HomeSkeleton = () => {
  return (  
    <>
      <style>
        {`
          .contenedor {
            height: 100%;
            display: block;
            margin: auto;
            vertical-align: center;
          }
        `}
      </style>
    <CardsContainer>
      {new Array(10).fill(0).map((_, i) => (
        <Card key={i}>
          <div className='contenedor'>
            <Skeleton className="animation-pulse"></Skeleton>
            <span>
              <TextSkeleton></TextSkeleton>
              <TextSkeleton></TextSkeleton>
            </span>
          <span style={{ display: 'flex', width: '100%', justifyContent:'center' }}>
          
              <BtnSkeleton>
              </BtnSkeleton>
          
          </span>
          </div>
        </Card>
      ))}
    </CardsContainer>
    </>
  );
}
 
export default HomeSkeleton;