import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MainContext } from "../context/main/MainContext";
import AppButton from "../components/custom_ui/AppButton";
import { AntDesign } from '@expo/vector-icons';
import { THEME } from "../theme";
import { DetailsContext } from "../context/details/DetailsContext";

const DetailsScreen = () => {
  const {quoteId, changeScreen} = useContext(MainContext);
  const {quote, fetchQuote} = useContext(DetailsContext);

  const loadQuote = useCallback(async () => {
    await fetchQuote(quoteId);
  }, [fetchQuote]);

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        {JSON.stringify(quote)}
      </Text>
      <View style={styles.button}>
        <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
          <AntDesign name="back" size={20}/>
        </AppButton>
      </View>
    </View>
  )
};

DetailsScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {}
});

export default DetailsScreen;