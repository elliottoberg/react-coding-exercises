import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Tabs from './tabsInterface';

const user = userEvent.setup();
const component = <Tabs />;

describe('TodoList component', () => {
  it('renders with correct default active tab', () => {
    render(component);

    expect(screen.getByRole("button", { name: "HTML" })).toHaveClass("tab active");
  });

  it('changes active tab and content with a click', async () => {
    render(component);

    const cssTab = screen.getByRole("button", { name: "CSS" });
    await user.click(cssTab);

    expect(cssTab).toHaveClass("tab active");
    expect(screen.getByText("Cascading Style Sheets is a", { exact: false })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "HTML" })).not.toHaveClass("tab active");
    expect(screen.queryByText("The HyperText Markup Language or HTML is", { exact: false })).not.toBeInTheDocument();
  });

  it('can change tabs multiple times', async () => {
    render(component);

    const cssTab = screen.getByRole("button", { name: "CSS" });
    await user.click(cssTab);

    expect(cssTab).toHaveClass("tab active");
    expect(screen.getByText("Cascading Style Sheets is a", { exact: false })).toBeInTheDocument();

    const javaScriptTab = screen.getByRole("button", { name: "JavaScript" });
    await user.click(javaScriptTab);

    expect(javaScriptTab).toHaveClass("tab active");
    expect(screen.getByText("JavaScript, often abbreviated as JS, is", { exact: false })).toBeInTheDocument();

    await user.click(cssTab);
    expect(cssTab).toHaveClass("tab active");
  });
});