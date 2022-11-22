import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { createActivity, getActivities } from "../redux/actions";

const Activity = () => {

  const dispatch  = useDispatch();
  const activities = useSelector((state) => state.activities);

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
    </main>
  );
}
 
export default Activity;