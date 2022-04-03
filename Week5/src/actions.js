import uuid from 'react-native-uuid'

//리듀서에서 재사용할 수 있도록 ADD_BOOK 상수를 만들고 export 함
export const ADD_BOOK = 'ADD_BOOK'

//재사용 가능한 상수인 REMOVE_BOOK을 만들어서 리듀서에서도 사용함
export const REMOVE_BOOK = 'REMOVE_BOOK'

//addBook 이라는 함수를 만들고
//type 정보와 하나의 인수로 전달된 도서 객체를 반환
export function addBook (book){
    return {
        type: ADD_BOOK,
        book: {
            ...book,
            id: uuid.v4()  //book에 새 키를 추가함
            //id 에 uuid.v4() 함수를 이용해서 새로 생성된 고유 식별자를 지정
        }
    }
}

//removeBook 함수를 추가함
//이 함수는 type과 인수로 전달된 book을 포함한 객체를 반환함
export function removeBook (book){
    return {
        type: REMOVE_BOOK,
        book
    }
}
