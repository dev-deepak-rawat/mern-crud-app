import React from 'react';
import ReactDOM from 'react-dom';
import UserDetailsContainer from './containers/UserDetailsContainer';
import './index.css'
import CurrentPageContextProvider from './contexts/CurrentPageProvider';

const App = () => {
    return (
        <CurrentPageContextProvider>
            <UserDetailsContainer />
        </CurrentPageContextProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));