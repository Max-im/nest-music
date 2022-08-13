import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import { MakeStore, Context, createWrapper } from "../node_modules/next-redux-wrapper/es6/index";
import thunk from '../node_modules/redux-thunk/es/index';
import { reducer, RootState } from './reducers/index';

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<RootState>(makeStore, {debug: true});
