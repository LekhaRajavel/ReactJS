import { fireEvent, render } from '@testing-library/react';
import CheckBoxWithLabel from '../src/sample/CheckBoxWithLabel';

it('CheckboxWithLabel changes the text after click', () => {
    const { queryByLabelText, getByLabelText } = render(<CheckBoxWithLabel labelOn="On" labelOff="Off" />);

    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));

    expect(queryByLabelText(/on/i)).toBeTruthy();
});
