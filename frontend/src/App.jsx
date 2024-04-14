import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function App() {
  // const navigate = useNavigate()
  // // if token is there then go to the verify email page else go to register page
  // useEffect(() => {
  //   if (localStorage.getItem('AuthoBearer')) {
  //     navigate('/verify-email')
  //   }
  //   else {
  //     navigate('/register')
  //   }
  // }, [])

  return (
    <div className="">
      <Outlet />
    </div>
  )
}

export default App
