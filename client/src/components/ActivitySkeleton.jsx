import styled from "styled-components";

const Form = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  width: 60%
`

const Input = styled.span`
  display: block;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: rgba(217, 217, 217, 0.62);
  width: 100%;
  height: 40px;
`

const Label = styled.label`
  background-color: rgba(217, 217, 217, 1);
  border-radius: 4px;
  margin-bottom: 8px !important;
  width: 100%;
  height: 15px;
  display: block;
`

const ActivitySkeleton = () => {
  return (  
    <Form>
      {new Array(5).fill(0).map((_, index) => (
        <div style={{marginBottom: 10, paddingRight: 20}} key={index}>
          <div style={{ marginBottom: 10, display: 'block' }}>
            <Label className="animation-pulse" />
            <Input className="animation-pulse" />
          </div>
        </div>
      ))}
    </Form>
  );
}
 
export default ActivitySkeleton;