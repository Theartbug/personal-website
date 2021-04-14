import React from 'react';
import { render } from '@testing-library/react';
import './mocks/intersectionObserver';
import App from '../components/app/App';
import { AppContext } from '../components/app-context/AppContext';

describe('Whole App Tests', () => {
  test('renders whole page', () => {
      const { container } = render(
        <AppContext>
          <App/>
        </AppContext>
      );
      expect(container).toMatchSnapshot();
  });
});