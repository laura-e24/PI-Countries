import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Index from "./pages/Index.jsx"
import Country from "./pages/Country.jsx"
import Activity from "./pages/Activity.jsx"
import Activities from "./pages/Activities.jsx"
import "./assets/styles/css/all.min.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />}>
        <Route path=":name"  />
      </Route>
      <Route path="/countries/:countryId" element={<Country />} />
      <Route path="/activities">
        <Route path="/activities" element={<Activities />} />
        <Route path="create" element={<Activity />} />
        <Route path=":activityId" element={<Activity operation="edit" />} />
      </Route>
    </Routes>
  );
}

export default App;