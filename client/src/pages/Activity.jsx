import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { createActivity, getActivities } from "../redux/actions";

const Activity = () => {

  const dispatch  = useDispatch();
  const activities = useSelector((state) => state.activities);
  const [values, setValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "", 
    countries: [
      {
        "id": "HUN",
        "name": "Hungary",
        "imgFlag": "https://flagcdn.com/w320/hu.png",
        "continent": "Europe",
        "capital": "Budapest",
        "subregion": "Central Europe",
        "area": 93028,
        "population": 9749763,
        "Activities": []
    },
      {
        "id": "AUS",
        "name": "Australia",
        "imgFlag": "https://flagcdn.com/w320/au.png",
        "continent": "Oceania"
    }
    ]
  })

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await  dispatch(createActivity(values))
    console.log(response)
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getActivities())
    }
    fetchData()
  }, [])
  
console.log(activities)
  return (  
    <main>
      <h1>Henry Countries --- Activity</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' value={values.name} onChange={handleChange}  />
        <input type='number' name='difficulty' value={values.difficulty} onChange={handleChange}  />
        <input type='number' name='duration' value={values.duration} onChange={handleChange}  />
        <input type='text' name='season' value={values.season} onChange={handleChange}  />
        <button>ENVIAR</button>
      </form>
    </main>
  );
}
 
export default Activity;