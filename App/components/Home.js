import React, {Component} from 'react'
import { StyleSheet, View, Text, Button, ART } from 'react-native';
const {
    Surface,
    Group,
    Shape,
  } = ART
import { connect } from 'react-redux';
import Pie, {userPurchases} from '../D3/doughnut'

const Home = props => {
    const chartWidth = 250
    const chartHeight = 250
    const {user, navigate} = props
        return (
            <View >
                <Surface width={chartWidth} height={chartHeight}>
                    <Pie userPurchases={userPurchases} chartX={chartWidth / 2} chartY={chartHeight / 2} />
                </Surface>
                <Button onPress={() => navigate('Webcam')} title="To Camera" />
            </View>
        )
}

const mapStateToProps = state => ({
    user: state.User
})

export default connect(null, null)(Home)
