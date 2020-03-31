import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        DetailsScreen
      </Text>
    </View>
  )
};

DetailsScreen.propTypes = {

};

const styles = StyleSheet.create({
    container: {}
});

export default DetailsScreen;