import { legacy_createStore as createStore} from 'redux';
import { MakeStore, Context, createWrapper } from "../node_modules/next-redux-wrapper/es6/index";
import { reducer, RootState } from './reducers/index';

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer);

export const wrapper = createWrapper<RootState>(makeStore, {debug: true})