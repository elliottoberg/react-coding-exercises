import { renderWithProviders } from 'src/testUtils/testingLibrary';
import TrafficLight from './trafficLight';

const component = <TrafficLight />;

describe('TrafficLight component', () => {
  it('renders the three traffic light colors', () => {
    const page = renderWithProviders(component);
    expect(page.getByText("green")).toBeInTheDocument();
    expect(page.getByText("yellow")).toBeInTheDocument();
    expect(page.getByText("red")).toBeInTheDocument();
  });
});