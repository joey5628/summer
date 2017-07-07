import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import styles from './styles'

export default class Progress extends Component {
    constructor (props) {
        super(props)
    }

    static defaultProps = {
        percent: 0,
        unfilled: 'show',
        appearTransition: false,
        styles: styles
    }



    render () {
        return (
            <View></View>
        )
    }
}
