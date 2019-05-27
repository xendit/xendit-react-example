import React, { Component } from 'react';
import { CheckBox, Text, View, TextInput, TouchableHighlight, WebView } from 'react-native';
import Xendit from 'xendit-js-node';

import styles from './styles';

export default class TokenScreen extends Component {
  static navigationOptions = {
    title: 'Test Tokenization',
  };

  constructor(props) {
    super(props);

    this.state = {
      amount: '70000',
      cardNumber: '4000000000000002',
      cardExpMonth: '12',
      cardExpYear: String(new Date().getFullYear() + 1),
      cardCvn: '123',
      isMultipleUse: false,
      isSkip3DS: false,
      isTokenizing: false,
      isRenderWebview: false,
      webviewUrl: ''
    }

    this.tokenize = this.tokenize.bind(this);
    this.getTokenData = this.getTokenData.bind(this);
    this._tokenResponseHandler = this._tokenResponseHandler.bind(this);
    this.setIsTokenizing = this.setIsTokenizing.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  onAmountChange(text) {
    this.setState({
      amount: text
    });
  }

  onCardNumberChange(text) {
    this.setState({
      cardNumber: text
    });
  }

  onCardExpMonthChange(text) {
    this.setState({
      cardExpMonth: text
    });
  }

  onCardExpYearChange(text) {
    this.setState({
      cardExpYear: text
    });
  }

  onCardCvnChange(text) {
    this.setState({
      cardCvn: text
    });
  }

  onMultiUseChange(val) {
    this.setState({
      isMultipleUse: val
    });
  }

  onSkip3DSChange(val) {
    this.setState({
      isSkip3DS: val
    });
  }

  setIsTokenizing() {
    this.setState({
      isTokenizing: !this.state.isTokenizing
    });
  }

  tokenize() {
    this.setIsTokenizing();
    Xendit.setPublishableKey('xnd_public_development_OYqIfOUth+GowsY6LeJOHzLCZtSj84J9kXDn+Rxj/mbf/LCoCQdxgA==');

    const tokenData = this.getTokenData();

    Xendit.card.createToken(tokenData, this._tokenResponseHandler);
  }

  getTokenData() {
    const {
      amount,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCvn,
      isMultipleUse,
      isSkip3DS
    } = this.state;

    return {
      amount,
      card_number: cardNumber,
      card_exp_month: cardExpMonth,
      card_exp_year: cardExpYear,
      card_cvn: cardCvn,
      is_multiple_use: isMultipleUse,
      should_authenticate: !isSkip3DS
    };
  }

  _tokenResponseHandler(err, token) {
    if (err) {
      alert(JSON.stringify(err));
      this.setIsTokenizing();

      return;
    }
    
    switch (token.status) {
      case 'APPROVED':
      case 'VERIFIED':
      case 'FAILED':
        alert(JSON.stringify(token));
        break;
      case 'IN_REVIEW':
        this.setState({
          webviewUrl: token.payer_authentication_url,
          isRenderWebview: true
        });

        break;
      default:
        alert('Unknown token status');
        break;
    }

    this.setIsTokenizing();
  }

  onMessage(rawData) {
    const data = JSON.parse(rawData.nativeEvent.data);

    this.setState({
      isRenderWebview: false
    }, () => {
      alert(JSON.stringify(data));
    });
  }

  render() {
    const {
      amount,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCvn,
      isMultipleUse,
      isSkip3DS,
      webviewUrl,
      isRenderWebview,
      isTokenizing
    } = this.state;

    if (isRenderWebview) {
      return (
        <WebView
          source={{uri: webviewUrl}}
          onMessage={this.onMessage}
        />
      )
    }

    return (
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Amount"
          defaultValue={amount}
          onChangeText={text => this.onAmountChange(text)}
          keyboardType={'numeric'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Card Number"
          maxLength={16}
          defaultValue={cardNumber}
          onChangeText={text => this.onCardNumberChange(text)}
          keyboardType={'numeric'}
        />
        <View style={styles.secondaryTextContainer}>
          <TextInput
            placeholder="Exp Month"
            maxLength={2}
            style={styles.secondaryTextInput}
            defaultValue={cardExpMonth}
            onChangeText={text => this.onCardExpMonthChange(text)}
            keyboardType={'numeric'}
          />
          <TextInput
            placeholder="Exp Year"
            maxLength={4}
            style={styles.secondaryTextInput}
            defaultValue={cardExpYear}
            onChangeText={text => this.onCardExpYearChange(text)}
            keyboardType={'numeric'}
          />
          <TextInput
            placeholder="CVN"
            maxLength={3}
            style={styles.secondaryTextInput}
            defaultValue={cardCvn}
            onChangeText={text => this.onCardCvnChange(text)}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            value={isMultipleUse}
            onValueChange={val => this.onMultiUseChange(val)}
          />
          <Text style={styles.defaultContent}> Multiple use token? </Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            value={isSkip3DS}
            onValueChange={val => this.onSkip3DSChange(val)}
          />
          <Text style={styles.defaultContent}> Skip authentication? </Text>
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.tokenize}
          disabled={isTokenizing}
        >
          <Text style={{color: '#fff'}}>Tokenize</Text>
        </TouchableHighlight>
      </View>
    );
  }
}