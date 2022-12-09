import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import SideBar from "../components/SideBar";

const MainContainer = styled.main`
  padding: 20px;
  width: 100%;
  height: 100vh;
`

const Layout = ({ children, showPagination, next, prev, jump, currentData, currentPage, pages }) => {


  return (  
    <>
      <MainContainer>
        <div className="w-full flex">
          <div>
            <SideBar jump={jump} />
          </div>
          <div className='w-full'>
            {children}
          </div>
        </div>
        {showPagination && (
          <Pagination 
            next={next}
            prev={prev}
            jump={jump}
            currentData={currentData}
            currentPage={currentPage}
            pages={pages}
          />
        )}
        <Outlet />
      </MainContainer>
    </>
  );
}
 
export default Layout;