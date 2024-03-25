import { render } from '@testing-library/react';
import TodoList from './todoList';

const component = <TodoList />;
describe('TodoList component', () => {
  it('renders correctly', () => {
    render(component);
  });
});