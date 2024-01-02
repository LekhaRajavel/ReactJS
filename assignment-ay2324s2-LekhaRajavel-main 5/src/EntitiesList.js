import React, { useState, useEffect } from 'react';
import Entity from './Entity.js';
import FilterEntitiesForm from './FilterEntitiesForm.js';
import { DeleteSelectedTestId } from './testId.js';


export default function EntitiesList({ entities, onDelete }) {
    const [selectedEntities, setSelectedEntities] = useState([]);
    const [filteredEntities, setFilteredEntities] = useState([]);

    useEffect(() => {
        // Update the state when the entities prop changes
        setFilteredEntities(entities);
    }, [entities]);


    return (
        <div>
            <FilterEntitiesForm entities={filteredEntities}
                onChangeFilter={(selectedCategories) => {
                    if (selectedCategories.length === 0) {
                        setFilteredEntities(entities);
                        console.log(selectedCategories.length, '0 inside if')
                    } else {
                        console.log(selectedCategories.length, '0 inside else')

                        const filtered = entities.filter((entity) =>
                            selectedCategories.includes(entity.value)

                        );
                        setFilteredEntities(filtered);
                        console.log(selectedCategories.length, 'inside else')
                        // entities=filteredEntities

                    }

                }} />
            <ul style={{ float: 'right', width: '65%' }}>

                <button data-testid={DeleteSelectedTestId} onClick={()=>{
                            const updatedEntities = entities.filter((item) => !selectedEntities.includes(item.id));
                            setFilteredEntities(updatedEntities);
                    
                            onDelete((prevEntities) => updatedEntities);
                    
                }}>Delete Selected</button>
            <li data-testid={EntityTestId} style={{ listStyle: 'none' }} >

                {filteredEntities.map((entity) => (
                    <Entity
                        key={entity.id}
                        entity={entity}
                        onDelete={() => {
                            const updatedEntities = entities.filter((item) => item.id !== entity.id);
                            console.log('Entities to be deleted:', updatedEntities);

                            setFilteredEntities(updatedEntities);
                            onDelete(updatedEntities); 
                        }}
                        onToggleSelect={(isChecked, entityId) => {
                            setSelectedEntities((prevSelected) =>
                                isChecked ? [...prevSelected, entityId] : prevSelected.filter((id) => id !== entityId)
                            );
                        }}
                    />
                ))}
                </li>
            </ul>

        </div>
    );
}
