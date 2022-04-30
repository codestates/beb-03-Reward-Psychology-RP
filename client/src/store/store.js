import { createStore } from 'redux';
import Mypage from '../page/mypage';
import reducer from './reducer';

const store = createStore(reducer);

export default store;
