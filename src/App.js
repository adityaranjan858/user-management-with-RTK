import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateForm from './component/CreateForm';
import Navbar from './component/Navbar';
import Users from './component/Users';
import UpdateUser from './component/UpdateUser';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <h3 className='text-capitalize d-flex justify-content-center mb-5 mt-2' style={{color: "#45eafd"}}>User Management with Redux Toolkit - API Integration</h3>
      <Routes>
        <Route exact path="/" element={<Users/>} />
        <Route exact path="/createform" element={<CreateForm/>} />
        <Route exact path="/users" element={<Users/>} />
        <Route exact path="/update/:id" element={<UpdateUser/>} />
      </Routes>
    </div>
  );
}

export default App;
