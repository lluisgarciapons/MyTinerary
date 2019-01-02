const initState = {
  cities: [],
  itineraries: [],
  activities: []
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_CITY":
      return {
        ...state,
        cities: action.cities
      };
    case "ADD_ITINERARY":
      return {
        ...state,
        itineraries: action.itineraries
      };
    case "ADD_ACTIVITY":
      return {
        ...state,
        activities: action.activities
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
