import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import App from '../src/App.js';
import {
    AddEntityCategoryTestId,
    AddEntitySubmitTestId,
    DeleteSelectedTestId,
    EntityCategoryTestId,
    EntityDeleteTestId,
    EntitySelectTestId,
    EntityTestId,
    FilterCategoryTestId,
} from '../src/testId.js';

describe('Rendering correct things', () => {
    it('Renders AddEntityForm', async () => {
        const renderResult = render(<App />);

        expect(renderResult.getByTestId(AddEntitySubmitTestId)).toBeTruthy();
        expect(renderResult.getByTestId(AddEntityCategoryTestId)).toBeTruthy();
    });

    it('Renders EntitiesList', async () => {
        const renderResult = render(<App />);

        expect(renderResult.getByTestId(DeleteSelectedTestId)).toBeTruthy();
    });

    it('Renders Entities on Add', async () => {
        const renderResult = render(<App />);

        fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' } });
        fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        expect(renderResult.getByTestId(EntityTestId)).toBeTruthy();
        expect(renderResult.getByTestId(EntityDeleteTestId)).toBeTruthy();
        expect(renderResult.getByTestId(EntityCategoryTestId).textContent).toBe('abc');
    });

    it('Renders categories in FilterEntitiesForm on Add', async () => {
        const renderResult = render(<App />);

        fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' } });
        fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        expect(renderResult.getByTestId(FilterCategoryTestId)).toBeTruthy();
    });
});

describe('Adding', () => {
    it('Adds the correct number of entities', async () => {
        const renderResult = render(<App />);

        for (let i = 0; i < 10; i++) {
            fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' } });
            fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        }
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(10);
    });

    it('Adds the correct number of category (1 - all duplicate)', async () => {
        const renderResult = render(<App />);

        for (let i = 0; i < 10; i++) {
            fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' } });
            fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        }
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(1);
    });
    it('Adds the correct number of category (10 - no duplicate)', async () => {
        const renderResult = render(<App />);

        for (let i = 0; i < 10; i++) {
            fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' + i } });
            fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        }
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(10);
    });
    it('Adds the correct number of category (5 - half duplicate)', async () => {
        const renderResult = render(<App />);

        for (let i = 0; i < 10; i++) {
            fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' + (i % 5) } });
            fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        }
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(5);
    });
});

function setup(entityCategories) {
    const renderResult = render(<App />);

    for (let i = 0; i < entityCategories.length; i++) {
        const category = entityCategories[i];
        fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: category } });
        fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
    }

    return renderResult;
}
function selectAndDelete(renderResult, entities, toDelete) {
    const deleteSelectedButton = renderResult.getByTestId(DeleteSelectedTestId);
    const selectElement = renderResult.getAllByTestId(EntitySelectTestId);
    expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entities.length);
    for (let i = 0; i < toDelete.length; i++) {
        fireEvent.click(selectElement[toDelete[i]]);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entities.length);
    }
    fireEvent.click(deleteSelectedButton);
    expect(renderResult.queryAllByTestId(EntityTestId)).toHaveLength(entities.length - toDelete.length);
}

describe('Deleting only', () => {
    it('Entity delete button deletes one', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);
        const deleteButtons = renderResult.getAllByTestId(EntityDeleteTestId);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entities.length);
        fireEvent.click(deleteButtons[3]);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entities.length - 1);
        fireEvent.click(deleteButtons[5]);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entities.length - 2);
    });

    it('Deletes ONE when only ONE is checked for deletion', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);

        selectAndDelete(renderResult, entities, [1]);
    });

    it('Deletes TWO when TWO is checked for deletion', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);

        selectAndDelete(renderResult, entities, [2, 4]);
    });

    it('Deletes FOUR when FOUR is checked for deletion', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);

        selectAndDelete(renderResult, entities, [2, 4, 0, 3]);
    });

    it('Deletes ALL when ALL is checked for deletion', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);

        selectAndDelete(renderResult, entities, [2, 4, 0, 3, 1, 5]);
    });
});

describe('Filtering only', () => {
    it('Filters correctly with 1 out of 2 category selected', async () => {
        const renderResult = setup(['abc', 'abc', 'def', 'def', 'def', 'def']);
        const filter = renderResult.container.querySelector('[data-testid=filter-category][value=abc]');
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(6);
        fireEvent.click(filter);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(2);
    });

    it('Filters correctly with 3 out of 5 category selected', async () => {
        const entities = ['a', 'a', 'b', 'b', 'b', 'c', 'c', 'd', 'd', 'e'];
        const renderResult = setup(entities);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(entities.length);
        fireEvent.click(renderResult.container.querySelector('[data-testid=filter-category][value=a]'));
        fireEvent.click(renderResult.container.querySelector('[data-testid=filter-category][value=c]'));
        fireEvent.click(renderResult.container.querySelector('[data-testid=filter-category][value=e]'));
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(5);
    });

    it('Shows all when all category selected', async () => {
        const renderResult = setup(['abc', 'abc', 'def', 'def', 'def', 'def', 'hij']);
        const filters = renderResult.getAllByTestId(FilterCategoryTestId);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(7);
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            fireEvent.click(filter);
        }
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(7);
    });

    it('Removes filter when some were selected then later all unselected', async () => {
        const renderResult = setup(['abc', 'abc', 'def', 'def', 'def', 'def', 'hij']);
        const filter = renderResult.container.querySelector('[data-testid=filter-category][value=abc]');
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(7);
        fireEvent.click(filter);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(2);
        fireEvent.click(filter);
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(7);
    });
});

describe('Adding with filtering', () => {
    it('Add entity with currently filtered category', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);
        fireEvent.click(renderResult.container.querySelector('[data-testid=filter-category][value=abc]'));
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(2);
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(2);

        for (let i = 0; i < 3; i++) {
            fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'abc' } });
            fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        }
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(5);
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(2);
    });

    it('Add new unselected category in filter list when filters is currently applied', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);
        fireEvent.click(renderResult.container.querySelector('[data-testid=filter-category][value=abc]'));
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(2);
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(2);

        for (let i = 0; i < 3; i++) {
            fireEvent.change(renderResult.getByTestId(AddEntityCategoryTestId), { target: { value: 'hij' } });
            fireEvent.click(renderResult.getByTestId(AddEntitySubmitTestId));
        }
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(2);
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(3);
    });
});

describe('Deleting with filtering', () => {
    it('Deletes filters correctly - removes filter when no more such category', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);
        const selects = renderResult.container.querySelectorAll('[data-testid=entity-select][value=abc]');
        for (let i = 0; i < selects.length; i++) {
            fireEvent.click(selects[i]);
        }
        fireEvent.click(renderResult.getByTestId(DeleteSelectedTestId));
        expect(renderResult.getAllByTestId(FilterCategoryTestId)).toHaveLength(1);
    });

    it('Clears filter when all filtered is deleted', async () => {
        const entities = ['abc', 'abc', 'def', 'def', 'def', 'def'];
        const renderResult = setup(entities);

        fireEvent.click(renderResult.container.querySelector('[data-testid=filter-category][value=abc]'));
        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(2);

        const selects = renderResult.getAllByTestId(EntitySelectTestId);
        for (let i = 0; i < selects.length; i++) {
            fireEvent.click(selects[i]);
        }
        fireEvent.click(renderResult.getByTestId(DeleteSelectedTestId));

        expect(renderResult.getAllByTestId(EntityTestId)).toHaveLength(4);
    });
});
