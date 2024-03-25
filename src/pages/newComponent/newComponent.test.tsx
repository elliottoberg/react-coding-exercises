import { render } from '@testing-library/react';
import NewComponent from './newComponent';

// import userEvent from '@testing-library/user-event'
// const user = userEvent.setup();

const component = <NewComponent />;

describe('NewComponent component', () => {
  it('renders correctly', () => {
    render(component);
  });
});