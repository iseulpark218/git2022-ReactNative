import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Home from './Home';

export default function mainnavigator() {
  const [index, setIndex] = useState<number>(0);
  // 여러개라 배열로
  // JSON방식 {}
  const [routes] = useState([{key: 'home', title: 'home', icon: 'home'}]);
  //   renderScene변수 준비
  // BottomNavigation이 제공하고 있는 SceneMap함수를 적용시키는데
  // 이름은 home으로
  const renderScene = BottomNavigation.SceneMap({
    home: Home,
  });
  //   리턴할 엘리먼트 정보가 있어야 한다
  //   BottomNavigation안 속성넣기 ex)navigationState,onIndexChange...
  //   onIndexChange값이 바뀌면, setIndex를 실행시켜라
  // renderScene은 위에 지정한 renderScene변수를 실행시켜라
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
