import { createStore } from 'redux';
import rootStoreReducer from './reducer';

const rootStore = createStore(rootStoreReducer);

rootStore.subscribe(() => {});

export default rootStore;