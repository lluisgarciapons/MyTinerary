import React from "react";
import Activity from "./Activity.js";

const ActivitiesList = ({ activities }) =>
  activities.map(activity => (
    <Activity key={activity._id} activity={activity} />
  ));

export default ActivitiesList;
