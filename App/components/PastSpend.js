import React from "react";
import { Line, SpendHistory, Histogram } from "./";
import { View, Text, ScrollView } from "react-native";
import styles from "../../public";
import { connect } from "react-redux";
import { Dropdown } from "react-native-material-dropdown";
import * as d3 from "d3";
import { sanFranciscoWeights } from "react-native-typography";

const formatMoney = number => {
  return number.toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  );
};

export default class PastSpend extends React.Component {
  state = {
    month: "Total"
  };

  render() {
    const { purchases } = this.props.navigation.state.params;
    const formatter = d3.timeFormat("%b %y");
    const parser = d3.timeParse("%b %y");

    const categoryDataByMonth = d3
      .nest()
      .key(d => formatter(new Date(d.date)))
      .key(d => d.category)
      .rollup(d => d3.sum(d, g => g.amount))
      .entries(purchases)
      .sort((a, b) => parser(b.key) - parser(a.key));

    const categoryDataTotal = d3
      .nest()
      .key(d => "Total")
      .key(d => d.category)
      .rollup(d => d3.sum(d, g => g.amount))
      .entries(purchases);

    const allData = [...categoryDataTotal, ...categoryDataByMonth];

    const months = allData.map(month => ({ value: month.key }));

    let currentData = allData
      .find(month => month.key === this.state.month)
      .values.sort((a, b) => b.value - a.value);
    return (
      <View style={styles.pastSpendContainer}>
        <View>
          <Text style={styles.smallTitle}>Past Spend by Category</Text>
          <Dropdown
            label="Select Month"
            value="Total"
            data={months}
            style={sanFranciscoWeights.medium}
            onChangeText={value => this.setState({ month: value })}
          />
          <View>
            <Text style={styles.h1Text}>
              You spent{" "}
              {formatMoney(
                currentData.reduce((total, cat) => total + cat.value, 0)
              )}{" "}
              in {this.state.month}
            </Text>
          </View>
          <Histogram data={currentData} height={200} margin={20} />
        </View>
        <ScrollView bounce={false}>
          <View>
            {/* <Line data={currentData} /> */}
            <SpendHistory data={currentData} style={styles.spendHistory} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

