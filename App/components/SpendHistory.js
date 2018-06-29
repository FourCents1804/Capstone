import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Card } from "react-native-elements";
import { sanFranciscoWeights } from "react-native-typography";
import * as d3 from "d3";
import styles from "../../public";
const purchases = require("../../seed/purchaseData");

const formatter = d3.timeFormat("%b %y");
const parser = d3.timeParse("%b %y");

const month = d3
  .nest()
  .key(mon => formatter(new Date(mon.createdAt)))
  .entries(purchases);

const monthArr = month.map(eachMon => {
  let valueObj = {};
  if (!valueObj["value"]) {
    valueObj["value"] = eachMon.key;
  }
  return valueObj;
});

const categoryDataByMonth = d3
  .nest()
  .key(d => formatter(new Date(d.createdAt)))
  .key(d => d.categoryBroad)
  .rollup(d => d3.sum(d, g => g.amount))
  .entries(purchases)
  .sort((a, b) => parser(b.key) - parser(a.key));

class SpendHistory extends Component {
  state = {
    dataArr: [],
    height: 0
  };

  categoryForSelectedVal = val => {
    categoryDataByMonth.forEach(mon => {
      if (mon.key === val) {
        this.setState({
          dataArr: mon.values
        });
      }
    });
  };

  render() {
    return (
      <View>
        <Dropdown
          label="Select Month"
          data={monthArr}
          style={sanFranciscoWeights.medium}
          onChangeText={value => this.categoryForSelectedVal(value)}
        />
        {this.state.dataArr.length ? (
          <View style={{ flex: 1 }}>
            {this.state.dataArr.map(data => {
              return (
                <View key={data.key}>
                  <Card title={data.key}>
                    <Text
                      style={[
                        sanFranciscoWeights.regular,
                        styles.spendHistoryCat
                      ]}
                    >
                      Amount: ${data.value.toFixed(2)}
                    </Text>
                  </Card>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  }
}

export default SpendHistory;
