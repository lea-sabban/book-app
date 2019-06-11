import React, { Component } from "react";
import CardView from "./card";

class GridView extends Component {
  render() {
    return (
      <div className="card-grid-view">
        {this.props.data.map((cardData, index) => (
          <CardView
            onViewDetail={this.props.onViewDetail}
            data={cardData}
            onDelete={this.props.onDelete}
            onEdit={this.props.onEdit}
            key={"card-id-" + index}
          />
        ))}
      </div>
    );
  }
}
export default GridView;
