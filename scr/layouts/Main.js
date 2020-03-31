import React, { useContext } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { MainContext } from "../context/main/MainContext";
import MainScreen from "../screens/MainScreen";
import DetailsScreen from "../screens/Details";
import { THEME } from '../theme';
import NavBar from "../components/NavBar";

function MyStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Main = () => {
  const { todoId } = useContext(MainContext);
  return (
    <View style={styles.container}>
      <MyStatusBar
        backgroundColor={Platform.OS === 'ios' ? '#fff' : THEME.MAIN_COLOR}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <NavBar title="Insta Forex Quotes"/>
      <View style={styles.container}>{todoId ? <DetailsScreen/> : <MainScreen/>}</View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;