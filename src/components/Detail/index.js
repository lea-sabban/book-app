import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
class DetailView extends Component {
  render() {
    const classes = this.props.classes;
    const { title, description, imageBig } = this.props.book;
    return (
      <Box display="flex" justifyContent="center">
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
          <Typography component="p">{description}</Typography>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={imageBig}
              title="Image title"
            />
          </Card>
        </Paper>
      </Box>
    );
  }
}
export default withStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  card: {
    width: "300px"
  },
  cardMedia: {
    paddingTop: "56.25%"
  }
}))(DetailView);
