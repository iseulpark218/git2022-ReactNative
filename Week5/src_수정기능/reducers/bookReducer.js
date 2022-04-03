/* // 초기 상태를 만들기
const initialState = {
  books: [
    {
      name: 'East of Eden',
      author: 'John Steinbeck',
    },
  ],
};

// state 인수에 기본 값을 initialState로 지정
const bookReducer = (state = initialState) => {
  // state 반환
  return state;
};

export default bookReducer;*/

// --------------------------------------------
// actions 파일에서 ADD_BOOK 상수를 가져옴
import {ADD_BOOK, REMOVE_BOOK, MODIFY_BOOK} from '../actions';
import uuid from 'react-native-uuid';
import {acc} from 'react-native-reanimated';

const initialState = {
  books: [
    {
      id: uuid.v4(), // 문자열 형태로 랜덤하게 32bit id를 만드는 함수
      name: 'East of Eden',
      author: 'John Steinbeck',
    },
  ],
};

// bookReducer의 두번째 인자로 액션을 추가
const bookReducer = (state = initialState, action) => {
  // action type에 따라 분기하는 switch문 추가
  switch (action.type) {
    case ADD_BOOK:
      // 전달받은 액션의 type이 ADD_BOOK이면, 새 books 배열 반환
      return {
        books: [
          ...state.books, // 바뀐 books
          action.book, // action에 의해 전달된 book
        ],
      };

    case REMOVE_BOOK: // type이 REMOVE_BOOK이면 새 books 배열 반환
    // 삭제할 도서의 index 찾기
    {
      const index = state.books.findIndex(book => book.id === action.book.id);

      // 기존 books 배열에서 삭제할 도서의 index를 제외하고
      // 나머지 항목을 포함한 새 배열을 반환
      return {
        books: [
          ...state.books.slice(0, index),
          ...state.books.slice(index + 1),
        ],
      };
    }
    // 수정
    case MODIFY_BOOK: // 수정될 도서 제외하고 북 추가
    // 수정될 도서는 action의 book으로 아닌건 기존 book으로 map

    {
      // index 찾아서 해당 값 대입
      /* const index = state.books.findIndex(book => book.id === action.book.id);
        state.books[index] = action.book;  */

      return {
        books: [
          /* ...state.books.filter(book => book.id !== action.book.id),
             action.book, */
          ...state.books.map(book =>
            book.id === action.book.id ? action.book : book,
          ),
        ],
      };
    }
    // 해당되지 않으면 기존의 state를 그대로 반환
    default:
      return state;
  }
};

export default bookReducer;
