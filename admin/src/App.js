import React from 'react'
import "./app.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings, Loader } from "./components";

import { Ecommerce, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Line, Login, Signup, EditUser } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode, formPage, isLoading, user } = useStateContext();
  const RequiredAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }

  return (
    <>
      {isLoading &&
        <Loader />
      }
      <div className={currentMode === "Dark" ? "dar" : "ligh"} >
        <Router>
          <div className={`flex relative dark:bg-main-dark-bg`}>
            {
              (formPage) &&
              <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
                <TooltipComponent content="Settings" position='Top' >
                  <button type='button' onClick={() => setThemeSettings(true)} className='text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray transition-all duration-500 text-white hover:rotate-90' style={{ background: currentColor, borderRadius: "50%" }}>
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div>
            }
            {(formPage) ?
              (activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                  <Sidebar />
                </div>
              ) :
                (
                  <div className='w-0 dark:bg-secondary-dark-bg' >
                    <Sidebar />
                  </div>
                )) :
              ""
            }
            <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${formPage ? 'md:ml-72' : 'flex:2'}`} >
              {(formPage) &&
                <div className='flex md:static bg-main-bg dark:bg-main-dark-bg navbar w-full' >
                  <Navbar />
                </div>
              }

              <div>
                {themeSettings && <ThemeSettings />}
                <Routes>
                  {/* Dashboard */}
                  <Route path='/' element={
                    <RequiredAuth>
                      <Ecommerce />
                    </RequiredAuth>
                  } />
                  <Route path='/home' element={
                    <RequiredAuth>
                      <Ecommerce />
                    </RequiredAuth>
                  } />
                  {/* Pages */}
                  <Route path='/agents' element={user?.superAdmin? <Employees /> : <Navigate to="/" />} />
                  <Route path='/passengers' element={
                    <RequiredAuth>
                      <Customers />
                    </RequiredAuth>
                  } />
                  <Route path='/edituser/:id' element={
                    <RequiredAuth>
                      <EditUser />
                    </RequiredAuth>
                  } />
                  {/* Login */}
                  <Route path='/login' element={!user? <Login />: <Navigate to="/" />} />
                  {/* Signup */}
                  <Route path='/signup' element={user?.superAdmin?<Signup />:<Navigate to="/" />} />
                  {/* Apps */}
                  <Route path='/calendar' element={
                    <RequiredAuth>
                      <Calendar />
                    </RequiredAuth>
                  } />
                  <Route path='/kanban' element={
                    <RequiredAuth>
                      <Kanban />
                    </RequiredAuth>
                  } />
                  <Route path='/editor' element={
                    <RequiredAuth>
                      <Editor />
                    </RequiredAuth>
                  } />
                  <Route path='/color-picker' element={
                    <RequiredAuth>
                      <ColorPicker />
                    </RequiredAuth>
                  } />
                  {/* Charts */}
                  <Route path='/line' element={
                    <RequiredAuth>
                      <Line />
                    </RequiredAuth>
                  } />
                  <Route path='/area' element={
                    <RequiredAuth>
                      <Area />
                    </RequiredAuth>
                  } />
                  <Route path='/bar' element={
                    <RequiredAuth>
                      <Bar />
                    </RequiredAuth>
                  } />
                  <Route path='/pie' element={
                    <RequiredAuth>
                      <Pie />
                    </RequiredAuth>
                  } />
                  <Route path='/financial' element={
                    <RequiredAuth>
                      <Financial />
                    </RequiredAuth>
                  } />
                  <Route path='/color-mapping' element={
                    <RequiredAuth>
                      <ColorMapping />
                    </RequiredAuth>
                  } />
                  <Route path='/pyramid' element={
                    <RequiredAuth>
                      <Pyramid />
                    </RequiredAuth>
                  } />
                  <Route path='/stacked' element={
                    <RequiredAuth>
                      <Stacked />
                    </RequiredAuth>
                  } />
                   <Route path='*' element={
                    <RequiredAuth>
                      <Ecommerce />
                    </RequiredAuth>
                  } />
                </Routes>
              </div>
              {(formPage) &&
                <Footer />
              }
            </div>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App