import { useDispatch } from "react-redux";
import styled from "styled-components";
import { clearAllFilters, clearSorting } from "../features/countries/countriesSlice";

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

const FiltersList = ({ filtering, filter, removeFilter }) => (
  [...new Set(filtering[filter]?.values)].map((f, index) => (
    <span className="filter" key={index}>
      {f}
      <span className="remove-btn" onClick={() => removeFilter(filter, f)}>
        X
      </span>
    </span>
  ))
)

const SortingList = ({ by, order, removeSort }) => (
  <span className="filter">
    {by === 'population' ? "Población" : "Nombre"}, {order === 'asc' ? "ascendente" : "descendente"}
    <span className="remove-btn" onClick={() => removeSort()}>
      X
    </span>
  </span>
)

const FilterAndSortBar = ({ sorting, filtering, setSorting, setFiltering, filteringData, handleSort, handleFilter }) => {

  const dispatch  = useDispatch();
  const removeFilter = (filter, value) => {
    const filterValues = filtering.continents?.values.concat(filtering.activities?.values)

    if (filterValues.length === 1) {
      setFiltering({
        active: false,
        filterBy: [],
        [filter]: { values: [] }
      })

      dispatch(clearAllFilters())
    } 
    else {
      setFiltering(filtering => ({
        ...filtering,
        filterBy: filtering[filter].values.length === 1 
        ? filtering.filterBy.filter(f => f !== filter)
        : filtering.filterBy,
        [filter]: { values: filtering[filter].values.filter(f => f !== value) }
      }))

      handleFilter({
        continents: { values: filtering.continents?.values.filter(f => f !== value) },
        activities: { values: filtering.activities?.values.filter(f => f !== value) },
        filterBy: filtering[filter].values.length === 1 
        ? filtering.filterBy.filter(f => f !== filter)
        : filtering.filterBy
      })
    }
  }

  const removeSort = () => {
    setSorting({
      active: false,
      by: '',
      order: ''
    })
    
    dispatch(clearSorting())
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
            style={{ marginRight: 10 }} 
            onClick={() => {
              setFiltering(
                filtering.active 
                ? { 
                  active: false, 
                  filterBy: [],
                  continents: { values: [] }, 
                  activities: { values: [] } 
                }
                : { ...filtering, active: true }
              )

              if (filtering.active) dispatch(clearAllFilters())
            }}
          >
            Filtrar
          </Button>
          {filtering.active && (
            <Select 
              onChange={(e) => {
                setFiltering({ 
                  ...filtering, 
                  filterBy: filtering.filterBy.concat(e.target.value)
                })
              }} 
              name="filterBy"
            >
              <option value="">...</option>
              <option value="continents">Continente</option>
              <option value="activities">Actividad turística</option>
            </Select>
          )}
          {filtering.active && filtering.filterBy.includes("continents") && (
            <Select 
              onChange={async (e) => {
                setFiltering({ 
                  ...filtering, 
                  continents: { values: filtering.continents?.values.concat(e.target.value) }  
                })
                
                handleFilter({
                  ...filtering,
                  continents: { values: filtering.continents?.values.concat(e.target.value) }
                })
              }} 
              name='continents'
            >
              <option value="">...</option>
              {!!filteringData.continents.length ? (
                filteringData.continents.map((data, index) => (
                  <option key={index} value={data}>{data}</option>
                ))
              ) : (
                <option value=''>No hay elementos.</option>
              )}
            </Select>
          )}
          {filtering.active && filtering.filterBy.includes("activities") && (
            <Select 
              onChange={(e) => {
                setFiltering({ 
                  ...filtering, 
                  activities: { values: filtering.activities?.values.concat(e.target.value) }  
                })

                handleFilter({ 
                  ...filtering, 
                  activities: { values: filtering.activities?.values.concat(e.target.value) }  
                })
              }} 
              name='activities'
            >
              <option value="">...</option>
              {!!filteringData.activities.length ? (
                filteringData.activities.map((data, index) => (
                  <option key={index} value={data}>{data}</option>
                ))
              ) : (
                <option value=''>No hay elementos.</option>
              )}
            </Select>
          )}
          <Button 
            onClick={() => {
              setSorting(
                sorting.active 
                ? { active: false, by: '', order: '' }
                : { ...sorting, active: true }
              )
              if (sorting.active) dispatch(clearSorting())
            }}
          >
            Ordenar
          </Button>
          {sorting.active && (
            <Select 
              name="orderBy" 
              onChange={e =>  {
                setSorting({ ...sorting, by: e.target.value})
              }}
            >
              <option value="">...</option>
              <option value="population">Población</option>
              <option value="name">Nombre</option>
            </Select>
          )}
          {sorting.active && sorting.by && (
            <Select 
              onChange={e => {
                setSorting({ ...sorting, order: e.target.value })
                handleSort(sorting.by, e.target.value)
              }} 
              name="orderAs"
            >
              <option value="">...</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </Select>
          )}
        </div>
        {(!!filtering.continents?.values.length || !!filtering.activities?.values.length) && (
          <div style={{ marginTop: 8 }}>
            <span id='span'>Filtros aplicados: &nbsp;</span> 
            {!!filtering.continents?.values.length && <FiltersList filtering={filtering} filter='continents' removeFilter={removeFilter} />}
            {!!filtering.activities?.values.length && <FiltersList filtering={filtering} filter='activities' removeFilter={removeFilter} />}
          </div>
        )}
        {sorting.active && !!sorting.by && !!sorting.order && (
          <div style={{ marginTop: 8 }}>
            <span id='span'>Ordenar por: &nbsp;</span> 
            {<SortingList by={sorting.by} order={sorting.order} removeSort={removeSort} />}
          </div>
        )}
      </Container>
    </>
  );
}
 
export default FilterAndSortBar;