import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import MainState from "./scr/context/main/MainState";
import DetailsState from "./scr/context/details/DetailsState";
import Main from "./scr/layouts/Main";

async function loadApp() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={loadApp}
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />;
  }

  return (
    <MainState>
      <DetailsState>
        <Main/>
      </DetailsState>
    </MainState>
  );
}