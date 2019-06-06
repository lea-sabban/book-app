import React, { Component } from "react";
import Card from "./card";

class GridView extends React.Component {
  render() {
    return (
      <div className="card-grid-view">
        {this.props.data.map((cardData, index) => (
          <Card
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
