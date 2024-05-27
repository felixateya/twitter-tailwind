import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeLayout from "./pages/HomeLayout";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/' element={<HomeLayout/>}>
          <Route path="home" element={{}} />
          <Route path="explore" element={{}} />
          <Route path="notifications" element={{}} />
          <Route path="messages" element={{}} />
          <Route path="profile" element={{}} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
