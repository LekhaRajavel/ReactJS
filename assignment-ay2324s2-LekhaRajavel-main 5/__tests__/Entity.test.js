import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import Entity from '../src/Entity.js';
import { EntityDeleteTestId, EntitySelectTestId } from '../src/testId.js';

it('Renders id and category', async () => {
    const entity = { id: `Random-123`, category: `category-123` };
    const mockOnToggleSelect = jest.fn();
    const mockOnDelete = jest.fn();

    const renderResult = render(<Entity entity={entity} onToggleSelect={mockOnToggleSelect} onDelete={mockOnDelete} />);

    expect(renderResult.getByText(entity.id)).toBeTruthy();
    expect(renderResult.getByText(entity.category)).toBeTruthy();
});

it('Renders select and delete element', async () => {
    const entity = { id: `Random-123`, category: `category-123` };
    const mockOnToggleSelect = jest.fn();
    const mockOnDelete = jest.fn();

    const renderResult = render(<Entity entity={entity} onToggleSelect={mockOnToggleSelect} onDelete={mockOnDelete} />);

    expect(renderResult.getByTestId(EntitySelectTestId)).toBeTruthy();
    expect(renderResult.getByTestId(EntityDeleteTestId)).toBeTruthy();
});

it('Clicking select element calls onToggleSelect with true/false accordingly', async () => {
    const entity = { id: `Random-123`, category: `category-123` };
    const mockOnToggleSelect = jest.fn();
    const mockOnDelete = jest.fn();

    const renderResult = render(<Entity entity={entity} onToggleSelect={mockOnToggleSelect} onDelete={mockOnDelete} />);

    const select = renderResult.getByTestId(EntitySelectTestId);

    fireEvent.click(select);
    expect(mockOnToggleSelect).toHaveBeenCalledWith(true);
    fireEvent.click(select);
    expect(mockOnToggleSelect).toHaveBeenCalledWith(false);
    fireEvent.click(select);
    expect(mockOnToggleSelect).toHaveBeenCalledWith(true);
    fireEvent.click(select);
    expect(mockOnToggleSelect).toHaveBeenCalledWith(false);
});

it('Clicking delete element calls onDelete', async () => {
    const entity = { id: `Random-123`, category: `category-123` };
    const mockOnToggleSelect = jest.fn();
    const mockOnDelete = jest.fn();

    const renderResult = render(<Entity entity={entity} onToggleSelect={mockOnToggleSelect} onDelete={mockOnDelete} />);

    const deleteButton = renderResult.getByTestId(EntityDeleteTestId);

    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();
});
