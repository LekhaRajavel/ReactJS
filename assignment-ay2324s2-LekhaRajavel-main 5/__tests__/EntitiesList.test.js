import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import EntitiesList from '../src/EntitiesList.js';
import { DeleteSelectedTestId, EntityDeleteTestId, EntitySelectTestId, EntityTestId } from '../src/testId.js';

it('Renders deleteSelected element', async () => {
    const entitiesLength = 10;
    const entities = Array(entitiesLength)
        .fill(null)
        .map((_, id) => ({ id: `Random-${id}` }));
    const mockOnDelete = jest.fn();
    const renderResult = render(<EntitiesList entities={entities} onDelete={mockOnDelete} />);

    expect(renderResult.getByTestId(DeleteSelectedTestId)).toBeTruthy();
});

it('Renders correct number of entities', async () => {
    const entitiesLength = 10;
    const entities = Array(entitiesLength)
        .fill(null)
        .map((_, id) => ({ id: `Random-${id}` }));
    const mockOnDelete = jest.fn();

    const renderResult = render(<EntitiesList entities={entities} onDelete={mockOnDelete} />);

    expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entitiesLength);
});

it('Does not render duplicate entities', async () => {
    const entitiesLength = 10;
    const entities = Array(entitiesLength)
        .fill(null)
        .map((_, id) => ({ id: `Random-${id}` }));
    const mockOnDelete = jest.fn();

    const renderResult = render(<EntitiesList entities={entities} onDelete={mockOnDelete} />);

    for (let i = 0; i < entities.length; i++) {
        expect(renderResult.getAllByText(entities[i].id)).toHaveLength(1);
    }
});

it('Calls onDelete with ONE entity id when delete button pressed', async () => {
    const entitiesLength = 10;
    const entities = Array(entitiesLength)
        .fill(null)
        .map((_, id) => ({ id: `Random-${id}` }));
    const mockOnDelete = jest.fn();

    const renderResult = render(<EntitiesList entities={entities} onDelete={mockOnDelete} />);

    fireEvent.click(renderResult.getAllByTestId(EntityDeleteTestId)[4]);
    expect(mockOnDelete).toBeCalledWith([`Random-4`]);
});

it('Calls onDelete with SELECTED entity id(s) when delete button pressed', async () => {
    const entitiesLength = 10;
    const entities = Array(entitiesLength)
        .fill(null)
        .map((_, id) => ({ id: `Random-${id}` }));
    const mockOnDelete = jest.fn();

    const renderResult = render(<EntitiesList entities={entities} onDelete={mockOnDelete} />);

    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[4]);
    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[1]);
    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[3]);
    fireEvent.click(renderResult.getByTestId(DeleteSelectedTestId));

    expect(mockOnDelete).toBeCalledWith(expect.arrayContaining([`Random-1`, `Random-3`, `Random-4`]));
});

it('Allows unselection of entities', async () => {
    const entitiesLength = 10;
    const entities = Array(entitiesLength)
        .fill(null)
        .map((_, id) => ({ id: `Random-${id}` }));
    const mockOnDelete = jest.fn();

    const renderResult = render(<EntitiesList entities={entities} onDelete={mockOnDelete} />);

    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[1]);
    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[4]);
    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[3]);
    fireEvent.click(renderResult.getAllByTestId(EntitySelectTestId)[4]);
    fireEvent.click(renderResult.getByTestId(DeleteSelectedTestId));

    expect(mockOnDelete).toBeCalledWith(expect.not.arrayContaining([`Random-4`]));
});
