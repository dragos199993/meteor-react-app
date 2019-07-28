import React from 'react';
import Info from './Info.jsx';
import AddLink from './components/AddLink';
import AccountsUIWrapper from './components/auth/AccountsUIWrapper';

const App = () => (
  <div>
    <AccountsUIWrapper />
    <AddLink />
    <hr />
    <Info />
  </div>
);

export default App;
