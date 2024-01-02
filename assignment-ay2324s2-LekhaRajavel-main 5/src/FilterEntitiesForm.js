import { FilterCategoryTestId } from './testId.js';
import React from 'react';
import { useEffect } from 'react';


export default function FilterEntitiesForm({ entities, onChangeFilter }) {
    const entitiesValue = entities.map((entity) => entity.value)
    const uniqueSet = new Set(entitiesValue);
    const uniqueCategories = [...uniqueSet]
    const [selectedCategories, setselectedCategories] = React.useState([]);

    useEffect(() => {
        onChangeFilter(selectedCategories);

    }, [selectedCategories]);
    return (<div style={{ float: 'left', width: '30%' }}>

        <ul style={{ listStyle: 'none' }}>
            {uniqueCategories
                .map((category, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            data-testid={FilterCategoryTestId}
                            checked={selectedCategories.includes(category)}
                            onChange={() => {
                                const updatedCategories = selectedCategories.includes(category)
                                    ? selectedCategories.filter((c) => c !== category)
                                    : [...selectedCategories, category];

                                setselectedCategories(updatedCategories);

                                console.log('entities', entities);
                                console.log('uniqueCategories', uniqueCategories);
                                console.log('selectedCategories', selectedCategories);

                            }}
                        />
                        {category}
                    </li>
                ))}
        </ul>
    </div>
    );
}
