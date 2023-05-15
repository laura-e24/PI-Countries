import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SideBarComponent = styled.aside`
  padding: 20px 25px;
  background-color: rgba(237, 236, 236, 1);
  height: calc(100vh - 70px);
  border-radius: 10px;
  margin-right: 20px;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const Menu = styled.div`
  width: 100%;
  padding: 20px 0;
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
`

const MenuItem = styled.span`
  -webkit-transition: background 1s; /* For Safari 3.0 to 6.0 */
  transition: background 1s; /* For modern browsers */
  background: transparent;
  padding: 10px;
  display: block;
  border: solid 1px #8278D7;
  border-radius: 10px;
  color: #8278D7;
  ${({ active }) => !active && `
    &:hover {
      background: rgba(130, 120, 215, 0.62);
      color: white;
    }
  `}

  ${({ active }) => active && `
    background: #8278D7;
    color: white;
    font-weight: 600;
  `}
`
const Button = styled.input`
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
const SideBar = ({ jump }) => {

  const dispatch  = useDispatch();
  const location = useLocation()
  const [search, setSearch] = useState('')
  let navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // await  dispatch(getCountries(search))
    navigate(
      search 
      ? `/home?name=${search}`
      : '/home'
    );
    jump(1)
    setSearch('')
  }

  return (  
    <>
      <style>
        {`
          #label {
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 10px !important;
            width: 100%;
            display: block;
          }
        `}
      </style>
      <SideBarComponent>
        <form onSubmit={handleSubmit}>
          <label id='label'>Explorá tu próximo destino ✈️</label>
          <div style={{ display: 'flex' }}>
            <Input value={search} placeholder='Buscar país' onChange={e => setSearch(e.target.value)} />
            <SearchButton type='submit' value='Buscar' />
          </div>
        </form>
        <Menu>
          <Link onClick={() => jump(1)} to='/home' style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname.includes('home')}>🏠 Home</MenuItem>
          </Link>
          <Link to='/activities' style={{ textDecoration: 'none' }}>
            <MenuItem active={location.pathname.includes('activities')}>📝 Actividades turísticas</MenuItem>
          </Link>
        </Menu>
      </SideBarComponent>
    </>
  );
}
 
export default SideBar;