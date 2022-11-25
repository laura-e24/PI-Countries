import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Button = styled.button`
  background: none;
	border: none;
	outline: inherit;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 20px;
  font-weight: 500;
  &:hover {
    color: #9F9797;
  }
`
const Select = styled.select`
  all: unset;
  padding: 8px 10px;
  border-radius: 6px;
  margin-right: 10px;
  background-color: rgba(217, 217, 217, 0.62);
`

const Option = styled.option`
  all: unset;
  padding: 8px 8px;
  border-radius: 6px;
  margin-right: 10px;
  background-color: rgba(217, 217, 217, 0.62);
`

const FilterAndSortBar = ({ sorting, filtering, setSorting, setFiltering, filteringData }) => {
  return (  
    <>
      <Container>
        <div>
          <Button onClick={() => setSorting({ ...sorting, active: !sorting.active })}>
            Ordenar
          </Button>
          {sorting.active && (
            <Select 
              name="orderBy" 
              onChange={e => setSorting({ ...sorting, by: e.target.value})}
            >
              <option value="">...</option>
              <option value="population">Población</option>
              <option value="name">Nombre</option>
            </Select>
          )}
          {sorting.active && sorting.by && (
            <Select 
              onChange={e => setSorting({ ...sorting, order: e.target.value })} 
              name="orderAs"
            >
              <option value="">...</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </Select>
          )}
          <Button style={{marginLeft: 10}} onClick={() => setFiltering({ ...filtering, active: !filtering.active })}>Filtrar</Button>
          {filtering.active && (
            <Select 
              onChange={(e) => setFiltering({ ...filtering, by: filtering.by.concat(e.target.value) })} 
              name="filterBy"
            >
              <option value="">...</option>
              <option value="continent">Continente</option>
              <option value="activity">Actividad turística</option>
            </Select>
          )}
          {filtering.active && filtering.by.map((f, i) => (
            <Select 
              key={i}
              onChange={(e) => setFiltering({ ...filtering, values: filtering.values.concat(e.target.value) })} 
              name={f}
            >
              <option value="">...</option>
              {filteringData[f].map((data, index) => (
                <option key={index} value={data}>{data}</option>
              ))}
            </Select>
          ))}
        </div>
      </Container>
    </>
  );
}
 
export default FilterAndSortBar;