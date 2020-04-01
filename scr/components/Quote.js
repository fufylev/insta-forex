import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { THEME } from '../theme';
import AppTextBold from "./custom_ui/AppTextBold";

const Quote = ({ quote, onOpen }) => {
  return (
    <TouchableOpacity onPress={() => onOpen(quote)}>
      <View style={styles.quote}>
        <AppTextBold style={{fontSize: 26}}>{quote.symbol}</AppTextBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1
  },
});

Quote.propTypes = {
  quote: PropTypes.object,
  onOpen: PropTypes.func,
};

export default Quote;