import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import ZoomIn from "material-ui/svg-icons/action/zoom-in";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
class ImageResults extends Component {
  //below is the state that we are using for managing dialog
  //open false means the dialog is closed and currentImg is the image that the use have clicked
  state = {
    open: false,
    currentImg: "",
  };
  //handle open will get the image that is clicked and change the state accordingly
  handleOpen = (img) => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    let imageListContent;
    const { images } = this.props;
    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map((img) => (
            <GridTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              //taking the url of the img clicked and storing in currentimage state
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }
    const actions = [
      <FlatButton label="Close" primary="true" onClick={this.handleClose} />,
    ];
    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageResults;
