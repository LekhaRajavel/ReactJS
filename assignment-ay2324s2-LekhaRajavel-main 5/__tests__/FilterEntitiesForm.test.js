import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import FilterEntitiesForm from '../src/FilterEntitiesForm.js';
import { FilterCategoryTestId } from '../src/testId.js';

it('Category displayed based on entities', async () => {
    const categoryCount = 5;
    const entities = new Array(categoryCount)
        .fill(null)
        .map((_, i) => [{ category: `Cat ${i}` }, { category: `Cat ${i}` }])
        .flat(1);

    const renderResult = render(<FilterEntitiesForm entities={entities} />);
    const categoryElements = renderResult.getAllByTestId(FilterCategoryTestId);
    expect(categoryElements).toHaveLength(5);

    const categories = {};
    for (let i = 0; i < categoryElements.length; i++) {
        const category = categoryElements[i].value;
        expect(categories[category]).toBeFalsy();
        categories[category] = true;
    }
});

it('Clicking filter calls OnFilterChange with selected filter', async () => {
    const mockOnSubmit = jest.fn();
    const categoryCount = 5;
    const entities = new Array(categoryCount)
        .fill(null)
        .map((_, i) => [{ category: `Cat ${i}` }, { category: `Cat ${i}` }])
        .flat(1);

    const renderResult = render(<FilterEntitiesForm entities={entities} onChangeFilter={mockOnSubmit} />);
    const categoryElements = renderResult.getAllByTestId(FilterCategoryTestId);
    fireEvent.click(categoryElements[2]);
    expect(mockOnSubmit).toHaveBeenCalledWith(categoryElements[2].value, true);
    fireEvent.click(categoryElements[3]);
    expect(mockOnSubmit).toHaveBeenCalledWith(categoryElements[3].value, true);
    fireEvent.click(categoryElements[3]);
    expect(mockOnSubmit).toHaveBeenCalledWith(categoryElements[3].value, false);
    fireEvent.click(categoryElements[2]);
    expect(mockOnSubmit).toHaveBeenCalledWith(categoryElements[2].value, false);
});
