import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getCountries } from '../redux/actions'

const SideBarComponent = styled.aside`
  max-width: 20%;
  padding: 20px 25px;
  background-color: rgba(237, 236, 236, 1);
  height: calc(100vh - 70px);
  border-radius: 10px;
  margin: auto 20px;
`

const Menu = styled.div`
  width: 100%;
  padding: 20px 0;
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
`

const MenuItem = styled.span`
  padding: 10px;
  display: block;
  border: solid 1px #8278D7;
  border-radius: 10px;
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
const SearchButton = styled(Button)`
  background: #8278D7;
  -webkit-transition: background 1s; /* For Safari 3.0 to 6.0 */
  transition: background 1s; /* For modern browsers */
	padding: 4px 6px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  &:hover {
    background: #D1CDF3;
    color: black;
  }
`

const Input = styled.input`
  all: unset;
  padding: 8px 8px;
  border-radius: 6px;
  margin-right: 10px;
  background-color: rgba(217, 217, 217, 0.62);
`
const SideBar = ({ page }) => {

  const dispatch  = useDispatch();
  const [search, setSearch] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await  dispatch(getCountries(search))
    console.log(response)
  }

  return (  
    <>
      <style jsx>
        {`
          label {
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 10px;
            width: 100%;
            display: block;
          }
        `}
      </style>
      <SideBarComponent>
        <form onSubmit={handleSubmit}>
          <label>Explorá tu próximo destino ✈️</label>
          <div style={{ display: 'flex' }}>
            <Input value={search} placeholder='Buscar país' onChange={e => setSearch(e.target.value)} />
            <SearchButton type='submit'>Buscar</SearchButton>
          </div>
        </form>
        <Menu>
          <MenuItem>Home</MenuItem>
          <MenuItem>Crear actividad</MenuItem>
        </Menu>
      </SideBarComponent>
    </>
  );
}
 
export default SideBar;