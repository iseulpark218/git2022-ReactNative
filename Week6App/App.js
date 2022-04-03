// // 1. Alert api test
// import React, { Component } from "react";
// // react-native 에서 alert api 가져오기
// import { TouchableHighlight, View, Text, StyleSheet, Alert } from 'react-native'

// let styles = {}

// export default class App extends Component {
//   constructor(){
//     super()

//     //state로 showMessage의 초기값을 false 로 저장
//     this.state = {
//       showMessage: false
//     }

//     this.showAlert = this.showAlert.bind(this)
//   }  //constructor

//   //showAlert 메서드 정의
//   // 두 개의 버튼과 title, message 지정
//   showAlert(){
//     // 임포트한 Alert 작동 구현
//     Alert.alert('Alert Test', 
//               'Alert Test Message', 
//               [{
//                 text: 'Cancel',
//                 onPress: () => console.log('Cancel cliked...'),
//                 style: 'destructive'
//               }, 
//                {
//                  text: 'Show Alert',
//                  // Show Alert 버튼을 누르면, state 의 showMessage 를 true 로 변경함
//                  onPress: () => this.setState({ showMessage: true })
//                }])
//   } //showAlert()
//   render(){
//     const { showMessage } = this.state
//     return (
//       <View style={styles.container}>
//         <TouchableHighlight onPress={this.showAlert} style={styles.button}>
//           <Text>TEST ALERT API</Text>
//         </TouchableHighlight>
//         {/* state 의 showMessage의 값이 false 이면 메세지 안 보이게 하기 */}
//         {
//            showMessage && <Text>Showing message - success</Text>
//         }
//       </View>
//     )
//   }
// }

// styles = StyleSheet.create({
//   container : {
//     justifyContent: 'center',
//     flex: 1
//   },
//   button: {
//     height: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ededed'
//   }
// })

// 2. AppState api
// 현재 앱이 활성화된 상태인지, 비활성화된 상태인지, 백그라운드 상태인지 확인할 때 사용함
// 'active', 'inactive', 'background' 반환함
// 앱의 상태에 따라 플랫폼의 특정 기능을 수행하게 하거나, 원하는 메서드를 호출함
// 주로 활용하는 이벤트는 change 와 memorywarning 임
// 앱의 상태가 변하면 이벤트가 발생하고, 이벤트 리스너를 통해 메서드를 호출함
// 인증에도 사용됨 : 포그라운드 실행시 앱의 잠금 화면을 풀기 위해 비밀번호 입력, 지문인식
//    등의 보안 단계를 추가할 수 있음
// 예제는 componentDidMount 에 change 이벤트를 감지하는 이벤트 리스너를 추가해서
//       앱의 현재 상태를 콘솔에 출력 표시함
// 실행시 안드로이드는 home 을 눌러서 상태를 변화시켜 봄
// 맥은 cmd - shift - h

// import React, { Component } from 'react'
// // react-native 에서 AppState api 가져오기
// import { AppState, View, Text, StyleSheet } from 'react-native'

// let styles = {}

// class App extends Component {
//   componentDidMount(){
//     //AppState.addEventListener 를 호출하고, change 와 콜백 함수를 인수로 전달함
//     AppState.addEventListener('change', this.handleAppStateChange)
//   }

//   handleAppStateChange(currentAppState){
//     //currentAppState 를 콘솔에 출력 표시함
//     console.log('currentAppState : ', currentAppState)
//   }

//   render(){
//     return (
//       <View style={styles.container}>
//         <Text>Test AppState API</Text>
//       </View>
//     )
//   }
// }

// styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     flex: 1
//   }
// })

// export default App


// 3. Clipboard api test
// import React, { Component} from 'react'
// // react-native 에서 Clipboard 가져오기
// import { TextInput, Clipboard, TouchableHighlight, View, Text, StyleSheet } from 'react-native'

// let styles = {}

// export default class App extends Component {
//   constructor(){
//     super()
//     // state 에 clipboardData 라는 빈 배열을 저장함
//     this.state = {
//       clipboardData: []
//     }

//     this.pushClipboardToArray = this.pushClipboardToArray.bind(this)
//   }

//   componentDidMount(){
//     //Clipboard 의 값을 'Hello, Clipboard!' 로 업데이트함
//     Clipboard.setString('Hello, Clipboard!')
//   }

//   //updateClipboard 메서드 추가함
//   //이 메서드는 기존의 클립보드의 값을 업데이트함
//   updateClipboard(string){
//     Clipboard.setString(string)
//   }

//   //async await 구문을 이용해서 클립보드 데이터에 배열 값을 추가함
//   async pushClipboardToArray(){
//     const { clipboardData } = this.state
//     //Clipboard 의 저장된 값을 꺼내서, 변수에 저장
//     var content = await Clipboard.getString()
//     //clipboardData 배열에 content 추가
//     clipboardData.push(content)

//     //state 에 clipboardData 재저장함
//     this.setState({ clipboardData })
//   }

//   render(){
//     const { clipboardData } = this.state
//     return (
//       <View style={ styles.container }>
//         <Text style={{ textAlign: 'center' }}>Test Clipboard API</Text>

//         {/* updateClipboard 메서드를 TextInput 에 연결함 */}
//         {/* TouchableHighlight를 누르면 pushClipboardToArray 메서드가 실행되게 함 */}
//         <TextInput style={ styles.input } onChangeText={(text) => this.updateClipboard(text)} />
//         <TouchableHighlight onPress={this.pushClipboardToArray} style={ styles.button }>
//             <Text>Click Add to Array</Text>
//         </TouchableHighlight>

//         {/* clipboardData 배열의 값을 매핑해서 화면에 출력 표시함 */}
//         {
//           clipboardData.map((d, i) => {
//             return <Text key={ i }>{ d }</Text>
//           })
//         }
//       </View>
//     )
//   }
// }

// styles = StyleSheet.create({
//   container : {
//     justifyContent: 'center',
//     flex: 1,
//     margin: 20
//   },
//   input: {
//     padding: 10,
//     marginTop: 15,
//     height: 60,
//     backgroundColor: '#dddddd'
//   },
//   button: {
//     backgroundColor: '#dddddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 60,
//     marginTop: 15,
//   }
// })


// 4. Dimensions api : 디바이스의 화면 정보 확인용
// import React, { Component } from 'react'
// // react-native 에서 Dimensions 가져오기
// import { View, Text, Dimensions, StyleSheet } from 'react-native'

// let styles = {}

// // width와 height 조회해 오기
// const { width, height } = Dimensions.get('window')

// //또는 width 객체 속성(object property)을 직접 조회해 오기
// const windowWidth = Dimensions.get('window').width

// //View 컴포넌트에서 조회해 와서 변수에 저장한 디바이스 정보를 뷰에 랜더링함
// const App = () => (
//   <View style={ styles.container }>
//     <Text>{ width }</Text>
//     <Text>{ height }</Text>
//     <Text>{ windowWidth }</Text>
//   </View>
// )

// styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })

// export default App


// 5. Geolocation api : 사용자의 위치 정보 확인, 위치 추적시에 사용
// 권한 설정이 필요함
// import React, { Component } from 'react'
// import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
// import Geolocation from '@react-native-community/geolocation'

// let styles = {}

// export default class App extends Component {
//   constructor(){
//     super()

//     //originalCoords, updateCoords, id로 구성된 초기 state 지정함
//     //originalCoords, updateCoords 는 빈 객체, id는 빈 문자열로 초기화함
//     this.state = {
//       originalCoords: {},
//       updateCoords: {},
//       id: ''
//     }

//     this.clearWatch = this.clearWatch.bind(this)
//   }

//   componentDidMount(){
//     //geolocation.getCurrentPosition 을 호출함
//     Geolocation.getCurrentPosition(
//       (info) => {
//         //originalCoords state 에 success.coords 를 저장함
//         this.setState({originalCoords: info.coords})
//       },
//       (err) => console.log('err', err)
//     )

//     // watchPosition 을 호출하고 함수 결과를 id 변수에 저장함
//     // 위치 추적을 중단할 때 id를 이용함
//     let id = Geolocation.watchPosition(
//       // id state의 값을 재저장함
//       (success) => {
//         this.setState({
//           id, 
//           updateCoords: success.coords
//         })
//       },
//       (err) => console.log('err', err)
//     )
//   }

//   //위치 추적을 중단하는 clearWatch 메서드 작성
//   clearWatch(){
//     Geolocation.clearWatch(this.state.id)
//   }

//   //원래 위치와 최근 위치의 위도와 경도를 화면에 표시함
//   render(){
//     const { originalCoords, updateCoords } = this.state
//     return (
//       <View style={ styles.container }>
//         <Text>Original Coordinates</Text>
//         <Text>Longitude : { originalCoords.longitude }</Text>
//         <Text>Latitude : { originalCoords.latitude }</Text>
//         <Text>Updated Coordinates</Text>
//         <Text>Longitude : { updateCoords.longitude }</Text>
//         <Text>Latitude : { updateCoords.latitude }</Text>

//         <TouchableHighlight onPress={this.clearWatch} style={ styles.button }>
//           <Text>ClearWatch</Text>
//         </TouchableHighlight>
//       </View>
//     )
//   }
// }

// styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   button: {
//     height: 60,
//     marginTop: 15,
//     backgroundColor: '#ededed',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })

// 6. Keyboard api
// import React, { Component }  from 'react'

// // 'react-native'에서 Keyboard API 가져오기
// import { TouchableHighlight, Keyboard, TextInput, View, Text, StyleSheet } from 'react-native'

// let styles = {}


// export  default  class App extends Component {

//   // 모든 키보드 이벤트에 이벤트 리스너를 설정하고 해당 이벤트가 발생한 경우에
//   // logEvent 메서드를 호출해서 콘솔에 이벤트 이름을 표시함
//   componentWillMount () {
//     this.keyboardWillShowListener =
//       Keyboard.addListener('keyboardWillShow', () => this.logEvent('keyboardWillShow'))
//     this.keyboardDidShowListener =
//       Keyboard.addListener('keyboardDidShow', () => this.logEvent('keyboardDidShow'))
//     this.keyboardWillHideListener =
//       Keyboard.addListener('keyboardWillHide', () => this.logEvent('keyboardWillHide'))
//     this.keyboardDidHideListener =
//       Keyboard.addListener('keyboardDidHide', () => this.logEvent('keyboardDidHide'))
//     this.keyboardWillChangeFrameListener =
//       Keyboard.addListener('keyboardWillChangeFrame', () => this.logEvent('keyboardWillChangeFrame'))
//     this.keyboardDidChangeFrameListener =
//       Keyboard.addListener('keyboardDidChangeFrame', () => this.logEvent('keyboardDidChangeFrame'))
//   }
  
//   // 이벤트 이름을 인수로 전달받아 콘솔에 이벤트 이름을 표시함
//   logEvent(event) {
//     console.log('event: ', event)
//   }
//   // 키보드를 화면에서 사라지게 함(
//   dismissKeyboard () {
//     Keyboard.dismiss()
//   }
//   //Keyboard.removeAllListeners를 호출하고 componentWillMount에서 선언한 각 이벤트를 인수로 전달함
//   removeListeners () {
//     Keyboard.removeAllListeners('keyboardWillShow')
//     Keyboard.removeAllListeners('keyboardDidShow')
//     Keyboard.removeAllListeners('keyboardWillHide')
//     Keyboard.removeAllListeners('keyboardDidHide')
//     Keyboard.removeAllListeners('keyboardWillChangeFrame')
//     Keyboard.removeAllListeners('keyboardDidChangeFrame')
//   }
  
  
//   render () {
//     return (
//       <View style={styles.container}>
//         <TextInput style={styles.input} />
//         {/* UI의 버튼에 dismissKeyboard 메서드를 연결 */}
//         <TouchableHighlight
//           onPress={this.dismissKeyboard}
//           style={styles.button}>
//           <Text>Dismiss Keyboard</Text>
//         </TouchableHighlight>
//         {/* UI의 버튼에 removeListener 메서드를 연결 */}
//         <TouchableHighlight
//           onPress={this.removeListeners}
//           style={styles.button}>
//           <Text>Remove Listeners</Text>
//         </TouchableHighlight>
//       </View>
//     )
//   }
// }

// styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 150,
//   },
//   input: {
//     margin: 10,
//     backgroundColor: '#ededed',
//     height: 50,
//     padding: 10
//   },
//   button: {
//     height: 50,
//     backgroundColor: '#dddddd',
//     margin: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })


//7. NetInfo api : 네트워크 연결 상태 확인
// import React, { Component } from "react";
// import { View, Text, StyleSheet } from 'react-native'
// import NetInfo from '@react-native-community/netinfo'

// export default class App extends Component {
//   constructor(){
//     super()

//     //connectionInfo 의 초기 state에 빈 객체 저장함
//     this.state = {
//       connectionInfo: {}
//     }    
//   }

//   componentDidMount(){

//     //초기 연결 상태를 조회해서 state 에 저장
//     NetInfo.fetch().then(connectionInfo => {
//       console.log("Connection type : ", connectionInfo.type)
//       console.log("is Connected : ", connectionInfo.isConnected)
//       this.setState(connectionInfo)
//     })

//     //새로운 연결 상태를 파악하고 state 에 저장
//     NetInfo.addEventListener(connectionInfo => {
//       console.log("Changed Connection type : ", connectionInfo.type)
//       console.log("is Connected : ", connectionInfo.isConnected)
//       this.setState(connectionInfo)
//     })
//   }

//   //연결 상태를 화면에 랜더링
//   render(){
//     return (
//       <View style={ styles.container }>
//         <Text>{this.state.type}</Text>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     fles: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })


// 8. PanResponder aip : touch와 gesture(제스처) 이벤트 정보 알아내기용
import React, { Component }  from 'react'

// 'react-native'에서 Dimensions, PanResponder 등 가져오기
import {
  Dimensions,
  TouchableHighlight,
  PanResponder,
  TextInput, View, Text, StyleSheet } from 'react-native'

// window의 width와 height 정보를 변수에 저장함
const { width, height } = Dimensions.get('window')
let styles = {}

export default class App extends Component {
  
  
  constructor () {
    super()
    this.state = {
      // oPosition 객체를 생성해서 정사각형의 원래 위치의 x 축과 y축의 정보를 state에 저장함
      // 화면의 정 중앙에 위치시키도록 설정
      oPosition: {
        x: (width / 2) - 100,
        y: (height / 2) - 100,
      },
      // position 객체를 생성해서 정사각형의 실제(actual) 위치의 x 축과 y축의 정보를 state에 저장함
      // 화면의 정 중앙에 위치시키도록 설정
      position: {
        x: (width / 2) - 100,
        y: (height / 2) - 100,
      },
    }
    this._handlePanResponderMove = this._handlePanResponderMove.bind(this)
    this._handlePanResponderRelease = this._handlePanResponderRelease.bind(this)

    // PanResponder를 생성하고, onStartShouldSetPanResponder에 true 값을 반환하고,
    // onPanResponderMove와 onPanResponderRelease 메서드를 설정함
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease
    })

  }
  
  // 움직임이 시작된 위치와 시작 위치에서 현재 위치까지의 거리를 계산해
  // 전체 이동 거리의 x와 y를 알아 냄. 알아낸 x와 y 값을 position state에 업데이트함
  _handlePanResponderMove (evt, gestureState) {
    let ydiff = gestureState.y0 - gestureState.moveY
    let xdiff = gestureState.x0 - gestureState.moveX
    this.setState({
      position: {
        y: this.state.oPosition.y - ydiff,
        x: this.state.oPosition.x - xdiff
      }
    })
  }
  
  // oPosition state에 뷰에 업데이트된 위치를 지정함
  _handlePanResponderRelease () {
    this.setState({
      oPosition: this.state.position
    })
  }
  
  render () {
    return (
      <View  style={styles.container}>
        <Text style={styles.positionDisplay}>
          x: {this.state.position.x} y:{this.state.position.y}
        </Text>
        
        {/* x와 y의 값을 뷰에 연결하고 마진을 업데이트해서 정사각형(item)을 드래그할 수 있게 만듦 */}
        
        <View
          {...this._panResponder.panHandlers} // I
          style={[styles.box, { marginLeft: this.state.position.x, marginTop: this.state.position.y } ]} />
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  positionDisplay: {
    textAlign: 'center',
    marginTop: 50,
    zIndex: 1,
    position: 'absolute',
    width
  },
  box: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'red'
  }
})
