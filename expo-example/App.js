import React, { useState } from 'react';
import { CheckBox, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';

import Xendit from 'xendit-js-node';

import styles from './styles';

export default function App() {
  const [amount, setAmount] = useState('70000')
  const [cardNumber, setCardNumber] = useState('4000000000000002')
  const [cardExpMonth, setCardExpMonth] = useState('12')
  const [cardExpYear, setCardExpYear] = useState(String(new Date().getFullYear() + 1))
  const [cardCvn, setCardCvn] = useState('123')
  const [isMultipleUse, setIsMultipleUse] = useState(false)
  const [isSkip3DS, setIsSkip3DS] = useState(false)
  const [isTokenizing, setIsTokenizing] = useState(false)
  const [isRenderWebview, setIsRenderWebview] = useState(false)
  const [webviewUrl, setWebviewUrl] = useState('')
  const [authenticationId, setAuthenticationId] = useState('')

  function tokenize() {
    setIsTokenizing(true);

    const tokenData = getTokenData();
    Xendit.setPublishableKey('xnd_public_development_OYqIfOUth+GowsY6LeJOHzLCZtSj84J9kXDn+Rxj/mbf/LCoCQdxgA==');

    Xendit.card.createToken(tokenData, _tokenResponseHandler);
  }

  function onMessage(rawData) {
    const data = JSON.parse(rawData.nativeEvent.data);

    setIsRenderWebview(false);
    alert(JSON.stringify(data));
  }

  function getTokenData() {
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

  function _tokenResponseHandler(err, token) {
    if (err) {
      alert(JSON.stringify(err));
      setIsTokenizing(false);

      return;
    }
    
    switch (token.status) {
      case 'APPROVED':
      case 'VERIFIED':
      case 'FAILED':
        alert(JSON.stringify(token))
        break;
      case 'IN_REVIEW':
        setAuthenticationId(token.authentication_id)
        setWebviewUrl(token.payer_authentication_url)
        setIsRenderWebview(true)

        break;
      default:
        alert('Unknown token status');
        break;
    }

    setIsTokenizing(false);
  }

  const INJECTED_JAVASCRIPT = `(function() {
      var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      var addEventListener = window[eventMethod];
      var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

      addEventListener(messageEvent, function(e) {
        var key = e.message ? 'message' : 'data';
        var messageStr = e[key];

        try {
          window.ReactNativeWebView.postMessage(messageStr);
        } catch (e) {}
    }, false);
  })();`;

  if (isRenderWebview) {
    return (
      <WebView
        source={{uri: webviewUrl}}
        onMessage={onMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    )
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Amount"
        defaultValue={amount}
        onChangeText={text => setAmount(text)}
        keyboardType={'numeric'}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Card Number"
        maxLength={16}
        defaultValue={cardNumber}
        onChangeText={text => setCardNumber(text)}
        keyboard
        Type={'numeric'}
      />

      <View style={styles.secondaryTextContainer}>
        <TextInput
          placeholder="Exp Month"
          maxLength={2}
          style={styles.secondaryTextInput}
          defaultValue={cardExpMonth}
          onChangeText={text => setCardExpMonth(text)}
          keyboardType={'numeric'}
        />
        <TextInput
          placeholder="Exp Year"
          maxLength={4}
          style={styles.secondaryTextInput}
          defaultValue={cardExpYear}
          onChangeText={text => setCardExpYear(text)}
          keyboardType={'numeric'}
        />
        <TextInput
          placeholder="CVN"
          maxLength={3}
          style={styles.secondaryTextInput}
          defaultValue={cardCvn}
          onChangeText={text => setCardCvn(text)}
          keyboardType={'numeric'}
        />
      </View>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isMultipleUse}
          onValueChange={val => setIsMultipleUse(val)}
        />
        <Text style={styles.defaultContent}> Multiple use token? </Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          value={isSkip3DS}
          onValueChange={val => setIsSkip3DS(val)}
        />
        <Text style={styles.defaultContent}> Skip authentication? </Text>
      </View>

      <TouchableHighlight
        style={styles.button}
        onPress={tokenize}
        disabled={isTokenizing}
      >
        <Text style={{color: '#fff'}}>Tokenize</Text>
      </TouchableHighlight>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
