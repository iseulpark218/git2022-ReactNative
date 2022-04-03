import React, {useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
// Provider 를 PaperProvider 바꾸겠다.
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme, DarkTheme} from 'react-native-paper';
import MainNavigator from './src/screens/MainNavigator';
import {ToggleThemeProvider} from './src/contexts';

export default function App() {
  // useColorScheme라는 함수를 실행시켜서 return
  const scheme = useColorScheme(); //현재 디바이스 사용중인 스키마 정보 획득
  // useState훅사용
  // theme변수가 값을 저장한다. setTheme사용해서 값을 변하게.
  // 값 변경 발생하면 렌더링되도록 useState가 동작할 것이다.
  const [theme, setTheme] = useState(
    // 위에서 어떤 스키마를 사용하고 있는지  useColorscheme()
    // scheme정보 - 현재 dark면, DarkTheme 적용하고, 아니면 DefaultTheme로 적용해라
    scheme == 'dark' ? DarkTheme : DefaultTheme,
  );
  // const toggleTheme = useCallback() //toggleTheme를 실행시켜라
  const toggleTheme = useCallback(
    () => setTheme(theme => (theme.dark ? DefaultTheme : DarkTheme)),
    [],
    // ToggleTheme를 이용해서 바꾸는 작업
    // setTheme를 준비해서 theme값을 가지고, theme가 dark면 DefaultTheme로 바꾸고, 아니면 DarkTheme로 지정해라.
    // []->딱 한번만 실행시킨다는 의미
  );
  return (
    <AppearanceProvider>
      {/* theme값이 PaperProvider로 전달이 되면,usecallback통해 가져와서 리렌더링시킨다?*/}
      <PaperProvider theme={theme}>
        {/* 기본적으로 속성이 toggleTheme라는 속성을 가지고 있고,
        {Toggle}테마 정보를 가지고 */}
        <ToggleThemeProvider toggleTheme={toggleTheme}>
          <SafeAreaView style={styles.safeAreaView}>
            <MainNavigator />
          </SafeAreaView>
        </ToggleThemeProvider>
      </PaperProvider>
    </AppearanceProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
});
