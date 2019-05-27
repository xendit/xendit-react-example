import { StyleSheet } from 'react-native';

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

export default styles;