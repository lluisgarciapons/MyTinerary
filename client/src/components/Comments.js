import React, { Component } from "react";
// import { connect } from "react-redux";
// import { changeToast } from "../store/actions/postCommentAction";
// import M from "materialize-css";
// import Axios from "axios";

export class Comments extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      inputValue: ""
      // comments: []
    };
  }

  // componentDidMount() {
  //   this.props.addComments(this.props.itinerary.city);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.comments !== this.props.comments) {
  //     this.setState({
  //       comments: nextProps.comments
  //     });
  //   }
  // }

  onClickHandler() {
    if (this.state.inputValue !== "") {
      let itinerary = this.props.itinerary;
      let commentBody = {
        user: {
          name: "Lluis",
          photo: "https://i.ibb.co/8g9hYx5/Gaudi-Lover.png"
        },
        itineraryId: itinerary._id,
        message: this.state.inputValue,
        date: Date.now(),
        city: itinerary.city
      };
      this.props.onClick(commentBody);
      this.setState({
        inputValue: ""
      });

      // var toastHTML = `<span>Message sent</span><button class="btn-flat toast-action">Undo</button>`;

      // var toastHTML = `<span>Message sent</span>`;
      // M.toast({ html: toastHTML, classes: "rounded" });
      // this.setState({
      //   inputValue: ""
      // });
    }
  }

  updateInputValue() {
    this.setState({
      inputValue: this.textInput.current.value
    });
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  deletePost(e) {
    e.persist();
    let confirmDelete = window.confirm(
      "are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      this.props.delete(e.target.id);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.toast !== nextProps.toast && this.props.toast) {
  //     var toastHTML = `<span>Message sent</span>`;
  //     M.toast({ html: toastHTML, classes: "rounded" });
  //     this.setState({
  //       inputValue: ""
  //     });

  //     this.props.changeToast(false);
  //   }
  // }

  render() {
    // console.log("Comments Component RENDER");
    const comments = this.props.comments;
    const isAuth = this.props.isAuthenticated;
    const userName = this.props.userName;
    // const itinerary = this.props.itinerary;
    return (
      <>
        {isAuth ? (
          <div className="row comments-section">
            <h3>Comments</h3>
            <div className="col s8 offset-s1">
              <input
                value={this.state.inputValue}
                ref={this.textInput}
                onChange={this.updateInputValue}
                className="comment-input"
                type="text"
                placeholder="write here"
              />
            </div>
            <button onClick={this.onClickHandler} className="btn">
              <i className="material-icons">send</i>
            </button>
            {/* </div> */}
            {/* <div className="row"> */}
            {comments.map((comment, index) => {
              let date = this.formatDate(new Date(comment.date));
              // let date = this.formatDate(new Date());
              // let date = this.formatDate(new Date(1546877595819));
              return (
                <div className="col s12 comment" key={index}>
                  <img
                    className="comment-image"
                    src={comment.user.photo}
                    alt="profile"
                  />
                  <div className="comment-box">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user.name}</span>
                      {userName === comment.user.name && (
                        <div
                          className="close"
                          onClick={this.deletePost.bind(this)}
                        >
                          <i id={comment._id} className="material-icons">
                            close
                          </i>
                        </div>
                      )}
                    </div>
                    <p className="comment-message">{comment.message}</p>
                    <small className="comment-time">{date}</small>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h3 className="alert comments-section">
            You must LOG IN to see the comments section.
          </h3>
        )}
      </>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     toast: state.toast
//   };
// };

// export default connect(
//   mapStateToProps,
//   { changeToast }
// )(Comments);

export default Comments;
