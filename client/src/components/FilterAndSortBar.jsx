import styled from "styled-components";
import { sortArr } from "../utils";

const Container = styled.div`
  padding: 20px 0;
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

const FilterAndSortBar = ({ sorting, filtering, setSorting, setFiltering, filteringData }) => {

  const removeFilter = filter => {
    setFiltering(
      filtering.values.length === 1 
      ? { active: false, by: [], values: [] }
      : { ...filtering, values: filtering.values.filter(f => f !== filter) }
    )
  }
  return (  
    <>
      <style>
        {`
          #span {
            font-weight: 600;
            color: rgb(107 114 128);
            margin-left: 8px;
          }
          .filter {
            margin-right: 10px;
            font-size: 14px
          }
          .remove-btn {
            font-weight: 600;
            color: rgba(211, 16, 39, 0.62);
            cursor: pointer;
            margin-left: 8px;
            
          }
          .remove-btn:hover {
            text-decoration: underline
          }
        `}
      </style>
      <Container>
        <div>
          <Button 
            onClick={() => {
              setSorting(
                sorting.active 
                ? { active: false, by: '', order: '' }
                : { ...sorting, active: true }
              )
            }}
          >
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
          <Button 
            style={{ marginLeft: 10 }} 
            onClick={() => {
              setFiltering(
                filtering.active 
                ? { active: false, by: [], values: [] }
                : { ...filtering, active: true }
              )
            }}
          >
            Filtrar
          </Button>
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
              {!!filteringData[f].length ? (
                sortArr(filteringData[f], 'asc', sorting.by).map((data, index) => (
                  <option key={index} value={data}>{data}</option>
                ))
              ) : (
                <option value=''>No hay elementos.</option>
              )}
            </Select>
          ))}
        </div>
        {!!filtering.values.length && (
          <div style={{ marginTop: 8 }}>
            <span id='span'>Filtros aplicados:</span> {!!filtering.values.length && (
              [...new Set(filtering.values)].map((filter, index) => (
                <span className="filter" key={index}>
                {filter}
                <span className="remove-btn" onClick={() => removeFilter(filter)}>
                  X
                </span>
                </span>
              ))
            )}
          </div>
        )}
      </Container>
    </>
  );
}
 
export default FilterAndSortBar;