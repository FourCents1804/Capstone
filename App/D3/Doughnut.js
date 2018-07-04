import * as d3 from "d3";
import React from "react";
import { ART, View } from "react-native";
const { Group, Shape, Text, Surface } = ART;
import styles from "../../public";
import DonutCarousel from "./DonutCarousel";

class Pie extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedSection: -1
    };
  }

  setSection = sectionId => {
    this.setState({ selectedSection: sectionId });
  };

  render() {
    const { purchases } = this.props;

    const width = 260;
    const height = 260;
    const margin = 30;
    const categoryData = purchases
      ? d3
          .nest()
          .key(d => d.categoryBroad)
          .rollup(d => d3.sum(d, g => g.amount))
          .entries(purchases)
          .sort((a, b) => b.value - a.value)
      : [];

    const pieData = d3.pie().value(d => d.value)(categoryData);

    const total = {
      key: "Total",
      value: categoryData.reduce((acc, curr) => acc + curr.value, 0)
    };

    const top5 = [total, ...categoryData.slice(0, 5)];

    const piePath = d3
      .arc()
      .outerRadius((width - margin) / 2)
      .padAngle(0.05)
      .innerRadius(80);

    const selectedPiePath = d3
      .arc()
      .outerRadius((width - margin) / 2 + 10)
      .padAngle(0.05)
      .innerRadius(80 + 10);

    const colors = [
      "#cfebef",
      "#95C8D8",
      "#008ECC",
      "#0E4D92",
      "#1034A6",
      "#000080",
      "#111E6C",
      "#111E6C",
      "#111E6C",
      "#111E6C",
      "#111E6C",
      "#111E6C",
      "#111E6C",
      "#111E6C",
      "#111E6C"
    ];

    return (
      <View style={styles.donutContainer}>
        <Surface width={width} height={height} style={styles.container}>
          <Group x={width / 2} y={height / 2} width={width} height={height}>
            {pieData.map(section => {
              const currPath =
                section.index === this.state.selectedSection
                  ? selectedPiePath
                  : piePath;
              return (
                <Group key={section.index}>
                  <Shape
                    d={currPath(section)}
                    stroke="#000"
                    fill={colors[section.index]}
                    strokeWidth={1}
                  />
                  {/* <Text
              font="10px Arial"
              fill="#000"
              x={label.centroid(section)[0]}
              y={label.centroid(section)[1]}
            >
              {`${section.data.category}`}
            </Text> */}
                </Group>
              );
            })}
          </Group>
        </Surface>
        <View style={styles.donutCarousel}>
          <DonutCarousel setSection={this.setSection} categories={top5} />
        </View>
      </View>
    );
  }
}

export default Pie;
