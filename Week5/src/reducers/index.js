//redux 패키지에서 여러 리듀서들을 결합하는 combineReducers 가져옴
import { combineReducers } from 'redux'

//현재폴더에 있는 bookReducer.js 가 가진 bookReducer 가져옴
import bookReducer from './bookReducer'

//모든 리듀서들을 합쳐서(포함하는) 루트 리듀서(root reducer) 만들기
const rootReducer = combineReducers({
    bookReducer
})
export default rootReducer