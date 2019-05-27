# xendit-react-example

## Description
This repo is created as an example on how to implement [`xendit-js-node`](https://github.com/xendit/xendit-js-node) library on React Native Framework.

Please take a look at:
- `tokenize` function on `react-native-example/screens/Token.js`
- `authenticate` function on `react-native-example/screens/Authentication.js`

To see how we implement WebView to render 3DS page and how we can catch the message. 

`alert` function on this app is used just for demonstrating that we successfully capture the token result. On real implementation, you should pass this value to your backend to do follow up action like [charge](https://xendit.github.io/apireference/#create-charge).

## How to Run
- `cd react-native-example`
- `yarn install`
- `yarn start`
- Run the app on your device through Expo app, or use Android simulator

## Ownership

Team: [TPI Team](https://www.draw.io/?state=%7B%22ids%22:%5B%221Vk1zqYgX2YqjJYieQ6qDPh0PhB2yAd0j%22%5D,%22action%22:%22open%22,%22userId%22:%22104938211257040552218%22%7D)

Slack Channel: [#integration-product](https://xendit.slack.com/messages/integration-product)

Slack Mentions: `@troops-tpi`
