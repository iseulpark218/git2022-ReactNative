import React from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
// Theme를 페이퍼에서 가져와서 적용
import {useTheme} from 'react-native-paper';
// contexts에 useToggleTheme가져오기
import {useToggleTheme} from '../contexts';

export default function Home() {
  const {dark, colors, fonts} = useTheme();
  // useToggleTheme실행시켜서 변수가 받아서 저장하게
  const toggleTheme = useToggleTheme();
  // () 화면구성하는 엘리먼트 구성해서 return
  //   colors.background -> 테마에서 지정한 colors에서 백그라운드 컬러 가져오겠다.
  return (
    <View style={[styles.view, {backgroundColor: colors.background}]}>
      <View style={[styles.bar, {backgroundColor: colors.primary}]}>
        <Text style={[styles.text, {color: colors.text}, fonts.medium]}>
          TopBar
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, {color: colors.text}, fonts.regular]}>
          Welcome to Context Area!
        </Text>
      </View>
      <View style={[styles.bar, {backgroundColor: colors.primary}]}>
        <Text style={[styles.text, {color: colors.text}, fonts.light]}>
          ButtonBar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1},
  bar: {
    height: 50,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 20, textAlign: 'center'},
});
