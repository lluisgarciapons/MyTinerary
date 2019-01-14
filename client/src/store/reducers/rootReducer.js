const initState = {
  cities: [],
  itineraries: [],
  activities: [],
  comments: [],
  toast: false
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
    case "ADD_COMMENT":
      return {
        ...state,
        comments: action.comments
      };
    case "POST_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.comments],
        toast: false
      };
    case "DEL_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.id)
      };
    case "CHANGE_TOAST":
      return {
        ...state,
        toast: action.toast
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
