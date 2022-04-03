import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

// actions 파일의 addBook, removeBook 함수 가져오기
import {addBook, modifyBook, removeBook} from './actions';

// react-redux에서 connect 가져오기
import {connect} from 'react-redux';

const ADD_BUTTON_ICON = '+';
const MODIFY_BUTTON_ICON = '*';

// name과 author 필드를 포함하는 초기화 state 객체 만들기
const initialState = {
  id: '',
  name: '',
  author: '',
  button: ADD_BUTTON_ICON,
};

class Books extends React.Component {
  // 컴포넌트 state : initialState 로 초기화
  state = initialState; // state 내장 변수

  validate = () => {
    // alert 처리
    const {name, author} = this.state;
    if (name.length === 0 || author.length === 0) {
      Alert.alert('Invalid Input!');
      return false;
    }
    return true;
  };

  // key와 value, 두 개의 인수를 사용하는 updateInput 메소드 만들기
  // spread 연산자를 이용해서 state를 업데이트함
  // spread 연산자는 기존의 state 키-값 쌍들을 새 state에 저장한 후
  // 새로운 키-값 쌍을 새 state에 추가
  updateInput = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  // dispatchAddBook 을 호출함. connect 함수의 props로 참조 가능
  addBook = () => {
    if (!this.validate()) {
      return;
    }

    this.props.dispatchAddBook(this.state);
    this.setState(initialState);
  };

  // removeBook
  // mapDispatchToProps 의 새 키로 this.props.dispatchRemoveBook을 호출
  removeBook = book => {
    this.props.dispatchRemoveBook(book);
  };

  selectBook = book => {
    this.setState({
      ...book,
      button: MODIFY_BUTTON_ICON,
    });
  };

  modifyBook = () => {
    if (!this.validate()) {
      return;
    }

    this.props.dispatchModifyBook(this.state);
    this.setState(initialState);
  };

  render() {
    // connect 함수가 books 배열을 반환하므로
    // 이 배열을 props로 참조할 수 있음
    const {books} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Books</Text>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.booksContainer}>
          {books.map((book, index) => (
            <View style={styles.book} key={index}>
              <Text style={styles.name} onPress={() => this.selectBook(book)}>
                {book.name}
              </Text>
              <Text style={styles.author}>{book.author}</Text>
              <Text onPress={() => this.removeBook(book)}>REMOVE</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            {/* onChangeText 이벤트 속성으로 updateInput 메소드를 전달받음
                    updateInput 메소드의 첫번째 인자에는 'name' 또는 'author'
                    updateInput 메소드의 두번째 인자에는 TextInput에 기록된 값을 전달함
                */}
            <TextInput
              value={this.state.name}
              onChangeText={value => this.updateInput('name', value)}
              style={styles.input}
              placeholder="Book name"
            />
            <TextInput
              value={this.state.author}
              onChangeText={value => this.updateInput('author', value)}
              style={styles.input}
              placeholder="Author name"
            />
          </View>

          {/* addBook 메소드를 호출함. 
                View 컴포넌트를 TouchableOpacity 컴포넌트로 감싸서
                터치 이벤트를 처리할 수 있게 함
            */}
          <TouchableOpacity
            onPress={
              this.state.button === '+' ? this.addBook : this.modifyBook
            }>
            <View style={styles.addButtonContainer}>
              <Text style={styles.addButton}>{this.state.button}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  booksContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flex: 1,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  book: {
    padding: 20,
  },
  name: {
    fontSize: 18,
  },
  author: {
    fontSize: 14,
    color: '#999',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    height: 44,
    padding: 7,
    backgroundColor: '#ededed',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    marginBottom: 5,
  },
  addButton: {
    fontSize: 28,
    lineHeight: 28,
  },
  addButtonContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ededed',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

// 리덕스의 상태 객체를 인수로 전달받고 하나의 키를 포함한 객체를 반환함
// 이 키는 books 배열을 포함하고 있음
const mapStateToProps = state => ({
  books: state.bookReducer.books,
});

// mapDispatchToProps 객체 생성
const mapDispatchToProps = {
  dispatchAddBook: book => addBook(book),
  dispatchRemoveBook: book => removeBook(book),
  dispatchModifyBook: book => modifyBook(book),
};

// connect 함수의 결과를 외부로 export
// mapDispatchtoProps를 conenct 함수의 두번째 인자로 전달
export default connect(mapStateToProps, mapDispatchToProps)(Books);
