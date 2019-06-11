import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

class CardView extends Component {
  render() {
    const { id, title, description, imageThumb } = this.props.data;
    const classes = this.props.classes;
    return (
      <div onClick={() => this.props.onViewDetail(this.props.data)}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item key={id} xs={12} sm={6} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={imageThumb}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography>{description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    className="edit"
                    onClick={e => this.props.onEdit(e, this.props.data)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={e => this.props.onDelete(e, this.props.data)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  card: {
    width: "300px",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))(CardView);
