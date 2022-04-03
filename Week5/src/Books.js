import React from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native'

//actions 파일의 addBook, removeBook 함수 가져오기
import { addBook, removeBook } from './actions'

//react-redux에서 connect 함수 가져오기
import {connect} from 'react-redux'

//name과 author 필드를 포함하는 초기화 state 객체 만들기
const initialState = {
    name: '',
    author: ''
}

class Books extends React.Component {

    //컴포넌트 state 준비함 : initialState 로 초기화함
    state = initialState

    //key와 value, 두 개의 인수를 사용하는 updateInput 메소드 만들기
    //spread 연산자를 이용해서 state 를 업데이트함
    //spread 연산자는 기존의 state 키-값 쌍들을 새 state 에 저장한 후
    //새로운 키-값 쌍을 새 state에 추가함
    updateInput = (key, value) => {
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    //dispatchAddBook 을 호출함. connect 함수의 props로 참조 가능
    addBook = () => {
        this.props.dispatchAddBook(this.state)
        this.setState(initialState)
    }

    //removeBook 이라는 새 클래스 메소드 작성
    //mapDispatchToProps 의 새 키로 this.props.dispatchRemoveBook 을 호출함
    removeBook = (book) => {
        this.props.dispatchRemoveBook(book)
    }

    render() {
        //connect 함수가 books 배열을 반환하므로
        //이 배열을 props로 참조할 수 있음
        const {books} = this.props
        return (
            <View style={styles.container}>
            <Text style={styles.title}>Books</Text>
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={styles.booksContainer}
            >
                {/* 배열을 매핑해서 각 도서의 이름과 저자를 표시함 */}
                {
                books.map((book, index) => (
                    <View style={styles.book} key={index}>
                        <Text style={styles.name}>{book.name}</Text>
                        <Text style={styles.author}>{book.author}</Text>
                        <Text style={styles.btn} onPress={() => this.removeBook(book)}>REMOVE</Text>
                    </View>
                ))
                }
            </ScrollView>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    {/* onChangeText 이벤트 속성으로 updateInput 메소드를
                       전달받음.
                       updateInput 메소드의 첫번째 인자에는 'name' 또는 'author',
                       두번째 인자에는 TextInput 에 기록된 값을 전달함 */}
                    <TextInput value={this.state.name} 
                            onChangeText={value => this.updateInput('name', value)}
                            style={styles.input}
                            placeholder='Book name' />
                    <TextInput value={this.state.author} 
                            onChangeText={value => this.updateInput('author', value)}
                            style={styles.input}
                            placeholder='Author name' />
                </View>

                {/* addBook  메소드를 호출함. View 컴포넌트를 
                   TouchableOpacity 컴포넌트롤 감싸서 
                   터치 이벤트를 처리할 수 있게 함 */}
                <TouchableOpacity onPress={this.addBook}>
                   <View style={styles.addButtonContainer}>
                        <Text style={styles.addButton}>+</Text>
                   </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
        container: {
        flex: 1
    },
    booksContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flex: 1
    },
    title: {
        paddingTop: 30,
        paddingBottom: 20,
        fontSize: 20,
        textAlign: 'center'
    },
    book: {
        padding: 20
    },
    name: {
        fontSize: 18
    },
    author: {
        fontSize: 14,
        color: '#999'
    },
    btn: {
     color:'grey'
    },
    inputContainer: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderTopColor: '#ededed',
        borderTopWidth: 1,
        flexDirection:'row',
        height: 100
    },
    inputWrapper: {
        flex: 1
    },
    input: {
        height: 44,
        padding: 7,
        backgroundColor: '#ededed',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        marginBottom: 5
    },
    addButton: {
        fontSize: 28,
        lineHeight: 28
    },
    addButtonContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#ededed',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
})

// 리덕스의 상태 객체를 인수로 전달받고 하나의 키를 포함한 객체를 반환함.
// 이 키는 books 배열을 포함하고 있음
const mapStateToProps = (state) => ({
    books: state.bookReducer.books
})

//mapDispatchToProps 객체를 생성함
const mapDispatchToProps = {
    dispatchAddBook: (book) => addBook(book),
    dispatchRemoveBook: (book) => removeBook(book)
}

//connect 함수의 결과를 외부에 export
//mapDispatchToProps를 connect 함수의 두번째 인자로 전달함
export default connect(mapStateToProps, mapDispatchToProps)(Books)
