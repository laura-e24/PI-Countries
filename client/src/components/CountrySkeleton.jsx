import styled from "styled-components"


const CardsContainer = styled.div`
display: block;
gap: 1rem;
justify-content: center;
margin-right: 20px;
`

const Card = styled.div`
padding: 8px 20px;
background-color: rgba(237, 236, 236, 1);
border-radius: 15px;
filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
width: 100%;
margin-bottom: 20px;
`
const Skeleton = styled.div`
  background-color: rgba(129, 129, 129, 0.2);
  border-radius: 8px;
  width: 250px;
  height: 100px;
`
const TextSkeleton = styled(Skeleton)`
  width: 50%;
  border-radius: 5px;
  height: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
`

const TitleSkeleton = styled(Skeleton)`
  width: 300px;
  border-radius: 8px;
  height: 40px;
  margin: 20px 0;
`

const CountrySkeleton = () => {
  return (  
    <>
      <style>
        {`
        `}
      </style>
      <div className="w-full" style={{ marginTop: 40, marginBottom: 20 }}>
        <TitleSkeleton className="animation-pulse"></TitleSkeleton>
        <CardsContainer>
          <Card>
            <div className="flex">
              <Skeleton className="animation-pulse my-auto" style={{ marginLeft: 10 }}></Skeleton>
              <div className="w-full" style={{ display: 'block'}}>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
              </div>
            </div>              
          </Card>
        </CardsContainer>
        <h4>Actividades turísticas</h4>
        <CardsContainer>
          {new Array(2).fill(0).map((_, index) => (
            <Card key={index}>
              <div className="flex">
                <Skeleton className="animation-pulse my-auto" style={{ width: 120, height: 50 }}></Skeleton>
                <div style={{ width: '50%' }}>
                  <TextSkeleton className="animation-pulse"></TextSkeleton>
                  <TextSkeleton className="animation-pulse"></TextSkeleton>
                  <TextSkeleton className="animation-pulse"></TextSkeleton>
                </div>
              </div>       
            </Card>
          ))}
        </CardsContainer>
      </div>
    </>
  );
}
 
export default CountrySkeleton;