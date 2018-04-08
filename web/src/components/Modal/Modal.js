import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  render() {
    const { buttons, show } = this.props;
    if (!show) {
      return null;
    }
    return (
      <div className="modal-backdrop">
        <div className="modal-content">{this.props.children}</div>
        <div className="modal-footer">{buttons}</div>
      </div>
    );
  }
}
Modal.propTypes = {
  show: PropTypes.bool.isRequired
};

// reference modal styles
// // The gray background
// const backdropStyle = {
//   position: "fixed",
//   top: 0,
//   bottom: 0,
//   left: 0,
//   right: 0,
//   backgroundColor: "rgba(0,0,0,0.3)",
//   padding: 50
// };

// // The modal "window"
// const modalStyle = {
//   backgroundColor: "#fff",
//   borderRadius: 5,
//   maxWidth: 500,
//   minHeight: 300,
//   margin: "0 auto",
//   padding: 30
// };
