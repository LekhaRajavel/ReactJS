import { useState } from 'react';
import React from 'react';
import { generateRandomId } from './helper.js';
import { AddEntityCategoryTestId, AddEntitySubmitTestId } from './testId.js';
import EntitiesList from './EntitiesList.js';

export default function AddEntityForm({ onSubmit }) {
    const [category, setCategory] = React.useState([])
    const [inputText, setInputText] = React.useState('')

    return <div  >
        <label>Category</label>
        <input
            type="text"
            data-testid={AddEntityCategoryTestId}
            value={inputText}
            onChange={(event) => {
                setInputText(event.target.value)
            }}
        ></input>

        <button data-testid={AddEntitySubmitTestId} onClick={(event) => {
            const randomID = generateRandomId();
            const newCategory = {
                id: randomID,
                value: inputText
            }
            setCategory([...category, newCategory]);
            setInputText('');

        }}>submit</button>

        <EntitiesList entities={category} onDelete={(updatedEntities) => {
                    setCategory(updatedEntities); // Update the state when entities are deleted

         }} />

    </div>;
}
