import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import AddEntityForm from '../src/AddEntityForm.js';
import { AddEntityCategoryTestId, AddEntitySubmitTestId } from '../src/testId.js';

it('Has submit and category element', async () => {
    const mockOnSubmit = jest.fn();

    const renderResult = render(<AddEntityForm onSubmit={mockOnSubmit} />);

    expect(renderResult.getByTestId(AddEntityCategoryTestId)).toBeTruthy();
});

it('On submit, adds new entity with id of length=15', async () => {
    const mockOnSubmit = jest.fn();

    const renderResult = render(<AddEntityForm onSubmit={mockOnSubmit} />);

    fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));

    expect(mockOnSubmit).toBeCalledWith(expect.objectContaining({ id: expect.stringMatching(/[a-zA-Z0-9]{15}/) }));
});

it('New entity includes category', async () => {
    const category = 'cat1';
    const mockOnSubmit = jest.fn();

    const renderResult = render(<AddEntityForm onSubmit={mockOnSubmit} />);

    const input = renderResult.getByTestId(AddEntityCategoryTestId);
    fireEvent.change(input, { target: { value: category } });
    fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));

    expect(mockOnSubmit).toBeCalledWith(expect.objectContaining({ category }));
});
