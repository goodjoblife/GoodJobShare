import React from 'react';
import ReactDOM from 'react-dom';
import Guidelines from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Guidelines />, div);
  ReactDOM.unmountComponentAtNode(div);
});
