import Asset from "./Components/Assets/Asset";
import Dash from "./Components/Dashboard/Dash";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Form from "./Components/Login/Form";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegisterForm from "./Components/Login/RegisterForm";
import AssetDetails from "./Components/Dashboard/AssetDetails";
import { ConProvider } from "./Context";
import Profile from "./Components/Dashboard/Profile";



function App() {
  return (
  <ConProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="backk">
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Form/>}/>
        <Route path="/dashboard" element={<Dash/>}/>
        <Route path="/assets" element={<Asset/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/assetDetails" element={<AssetDetails/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
      </Routes>
    </BrowserRouter>
    
    </div>
    </LocalizationProvider>
    </ConProvider>
   
  );
}

export default App;
