import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Index from "./pages/Index.jsx"
import Country from "./pages/Country.jsx"
import Activity from "./pages/Activity.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />}>
          <Route path=":name"  />
        </Route>
        <Route path="/country/:countryId" element={<Country />} />
        <Route path="/activity/create" element={<Activity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;