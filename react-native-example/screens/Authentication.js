import React, { Component } from 'react';
import { CheckBox, Text, View, TextInput, StyleSheet, TouchableHighlight, WebView } from 'react-native';
import Xendit from 'xendit-js-node';

export default class AuthenticationScreen extends Component {
  static navigationOptions = {
    title: 'Test 3DS',
  };

  constructor(props) {
    super(props);

    this.state = {
      amount: '70000',
      tokenId: '5ceb7ce30ab2454b10594553',
      isAuthenticating: false,
      isRenderWebview: false,
      webviewUrl: ''
    }

    this.authenticate = this.authenticate.bind(this);
    this._tokenResponseHandler = this._tokenResponseHandler.bind(this);
    this.setIsAuthenticating = this.setIsAuthenticating.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  onAmountChange(text) {
    this.setState({
      amount: text
    });
  }

  onTokenIdChange(text) {
    this.setState({
      tokenId: text
    });
  }

  setIsAuthenticating() {
    this.setState({
      isAuthenticating: !this.state.isAuthenticating
    });
  }

  authenticate() {
    const {
      tokenId,
      amount
    } = this.state;

    this.setIsAuthenticating();

    Xendit.setPublishableKey('xnd_public_development_OYqIfOUth+GowsY6LeJOHzLCZtSj84J9kXDn+Rxj/mbf/LCoCQdxgA==');

    const threeDSData = {
      amount,
      token_id: tokenId
    };

    Xendit.card.createAuthentication(threeDSData, this._tokenResponseHandler);
  }

  _tokenResponseHandler(err, token) {
    if (err) {
      alert(JSON.stringify(err));
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

    this.setIsAuthenticating();
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
      tokenId,
      webviewUrl,
      isRenderWebview,
      isAuthenticating
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
          placeholder="Token ID"
          maxLength={24}
          defaultValue={tokenId}
          onChangeText={text => this.onTokenIdChange(text)}
          keyboardType={'numeric'}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.authenticate}
          disabled={isAuthenticating}
        >
          <Text style={{color: '#fff'}}>Authenticate</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'flex-start',
    marginLeft: '10%'
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: '90%',
    fontSize: 15,
    height: 40,
    marginTop: 10
  },
  secondaryTextContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    paddingTop: 10,
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  secondaryTextInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexGrow: 1,
    fontSize: 15,
    height: 40,
    paddingRight: 10
  },
  checkBoxContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  defaultContent: {
    marginTop: 5
  },
  button: {
    marginTop: 30,
    backgroundColor: '#285E9C',
    padding: 10,
    borderRadius: 2
  }
})