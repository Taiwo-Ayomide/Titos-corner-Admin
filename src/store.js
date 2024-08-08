import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer'; // Adjust the path as needed

const store = createStore(rootReducer);

export default store;
