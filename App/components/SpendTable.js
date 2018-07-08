import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../../public';
import * as d3 from 'd3';

const formatMoney = (number) => {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const formatter = d3.timeFormat('%B %d, %Y');
const parser = d3.timeParse('%B %d, %Y');
const truncate = (str, length) => {
  return str.slice(0, length);
};

const DaySpend = props => {
  const { date, purchases } = props;
  return (
    <View style={styles.spendTableContainer}>
      <View style={styles.spendTableDate}>
        <Text style={styles.spendTableDateText}>
          {formatter(new Date(date))}
        </Text>
      </View>
      {purchases.map((purchase, index) => (
        <View key={purchase + index} style={styles.spendTableRow}>
          <Text style={styles.spendTableText}>{truncate(purchase.name, 30)}</Text>
          <Text style={styles.spendTableAmount}>
            {formatMoney(Number(purchase.amount))}
          </Text>
        </View>
      ))}
    </View>
  );
};

const SpendTable = props => {
  const {userPurchases} = props
  const last50Purchases = userPurchases.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 50)

  const purchases = last50Purchases.reduce((purchaseObj, curr, index) => {
    const parsedDate = parser(formatter(new Date(curr.date)))
    const purchase = {name: curr.name, amount: curr.amount}

    if (!purchaseObj[parsedDate]) {
      purchaseObj[parsedDate] = [purchase];
    } else {
      purchaseObj[parsedDate].push(purchase);
    }
    return purchaseObj;
  }, {});

  return (
    <View>
      {Object.keys(purchases).map(date => {
        return <DaySpend key={date} date={date} purchases={purchases[date]} />;
      })}
      hi
    </View>
  );
};

export default SpendTable;
