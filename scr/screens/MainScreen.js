import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TextInput, View } from 'react-native';
import { DetailsContext } from "../context/details/DetailsContext";
import { MainContext } from "../context/main/MainContext";
import { THEME } from "../theme";
import AppText from "../components/custom_ui/AppText";
import AppButton from "../components/custom_ui/AppButton";
import { AppLoader } from "../components/custom_ui/AppLoader";
import Quote from "../components/Quote";

const MainScreen = () => {
  const {fetchQuotes, quotes, quotesFiltered, filterQuotes, loading, error} = useContext(DetailsContext);
  const {changeScreen} = useContext(MainContext);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
  const [value, onChangeText] = useState('');

  const loadQuotes = useCallback(async () => {
    await fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    loadQuotes();
  }, []);

  useEffect(() => {
    filterQuotes(value)
  }, [value]);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });

  if (loading) {
    return <AppLoader/>;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadQuotes}>Try again</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{width: deviceWidth, flex: 1}}>
      <FlatList
        keyExtractor={item => item.symbol}
        data={quotesFiltered}
        renderItem={({item}) => <Quote quote={item} onOpen={changeScreen}/>}
      />
    </View>
  );

  if (quotes.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image style={styles.image} source={require('../../assets/no-items.png')}/>
      </View>
    );
  }

  const onChangeTextHandler = (text) => {
    onChangeText(text);
    filterQuotes(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{...styles.input, width: deviceWidth}}
        onChangeText={text => onChangeTextHandler(text)}
        placeholder='Search.....'
        value={value}
      />
      {content}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center'
  },
  input: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray', borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 26,
    marginBottom: 10
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 20
  },
});

export default MainScreen;