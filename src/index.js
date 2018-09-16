import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducer';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';




const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);



ReactDOM.render(<Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>, 
                document.getElementById('root'));
registerServiceWorker();
