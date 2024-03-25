import { render, screen } from '@testing-library/react';
import TrafficLight from './trafficLight';

const component = <TrafficLight />;

describe('TrafficLight component', () => {
  it('renders the three traffic light colors', () => {
    render(component);
    expect(screen.getByText("green")).toBeInTheDocument();
    expect(screen.getByText("yellow")).toBeInTheDocument();
    expect(screen.getByText("red")).toBeInTheDocument();
  });
});