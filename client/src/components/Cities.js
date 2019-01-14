import React, { Component } from "react";
import CitiesList from "./CitiesList";
import Footer from "./Footer.js";
import { connect } from "react-redux";
import addCities from "../store/actions/addCitiesAction";
import CityFilter from "./CityFilter";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      filteredCities: []
    };
  }

  async componentDidMount() {
    await this.props.addCities();

    this.setState({
      loaded: true
    });

    //   this.callApi()
    //     .then(res => {
    //       console.log(res);
    //       this.props.addCities(res);
    //     })
    //     .catch(err => console.log(err));
    // }
    // callApi = async () => {
    //   const response = await fetch("/cities/all");
    //   const body = await response.json();
    //   if (response.status !== 200) throw Error(body.message);
    //   return body;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cities !== this.props.cities) {
      this.setState({ filteredCities: nextProps.cities });
    }
  }

  filterCities = cityFilter => {
    let filteredCities = this.props.cities;
    filteredCities = filteredCities.filter(city => {
      let cityName = city.name.toLowerCase() + city.country.toLowerCase();
      return cityName.indexOf(cityFilter.toLowerCase()) !== -1;
    });
    this.setState({
      filteredCities
    });
    console.log("filtered cities:", this.state.filteredCities);
  };

  content() {
    // console.log(this.props);
    // const { cities } = this.props;    // this was for assigning all the cities comming from                                            the store to the const cities

    return (
      <div id="page-wrap">
        {/* <div className="row">
          <div className="col s8 offset-s2">
            <div className="input-field col s12">
              <input
                // placeholder="Placeholder"
                id="first_name"
                type="text"
                className="validate"
              />
              <label htmlFor="first_name">Search</label>
            </div>
          </div>
        </div> */}
        <CityFilter onChange={this.filterCities} />
        <div id="all-cities" className="all-cities">
          <CitiesList cities={this.state.filteredCities} />
        </div>
        <Footer />
      </div>
    );
  }

  render() {
    return <div>{this.state.loaded ? this.content() : null}</div>;
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addCities: cities => {
//       dispatch({ type: "ADD_CITY", cities: cities });
//     }
//   };
// };

export default connect(
  mapStateToProps,
  // mapDispatchToProps
  { addCities }
)(Cities);
