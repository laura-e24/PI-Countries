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
  width: 220px;
  height: 40px;
`
const TextSkeleton = styled(Skeleton)`
  width: 50%;
  border-radius: 5px;
  height: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 0px;
`

const ButtonSkeleton = styled(Skeleton)`
  width: 40px;
  border-radius: 999px;
  height: 40px;
  margin: 20px 10px;
`

const ActivitiesSkeleton = () => {
  return (  
    <>
      <style>
        {`
        `}
      </style>
      <div className="w-full" style={{ marginTop: 40, marginBottom: 20 }}>
        <CardsContainer>
          {new Array(2).fill(0).map((_, index) => (
            <span key={index}>
            <div className="flex">
              <ButtonSkeleton className="animation-pulse"></ButtonSkeleton>
              <ButtonSkeleton className="animation-pulse"></ButtonSkeleton>
              <ButtonSkeleton className="animation-pulse"></ButtonSkeleton>
            </div>
            <Card>
              <div className="flex" style={{ justifyContent: "space-between" }}>
                <Skeleton className="animation-pulse"></Skeleton>
                <Skeleton className="animation-pulse"></Skeleton>
              </div>
              <div className="w-full" style={{ display: 'block'}}>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
                <TextSkeleton className="animation-pulse"></TextSkeleton>
              </div>
            </Card>
            </span>
          ))}
        </CardsContainer>
      </div>
    </>
  );
}
 
export default ActivitiesSkeleton;