import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Index from "./pages/Index.jsx"
import Country from "./pages/Country.jsx"
import Activity from "./pages/Activity.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />}>
        <Route path=":name"  />
      </Route>
      <Route path="/countries/:countryId" element={<Country />} />
      <Route path="/activities" element={<Activity />}>
        <Route path="create" />
      </Route>
    </Routes>
  );
}

export default App;