import { EntityCategoryTestId, EntityDeleteTestId, EntitySelectTestId } from './testId.js';

export default function Entity({ entity, onToggleSelect, onDelete }) {
    const { id, value } = entity;
    return (
        <div style={{ border: 'black solid 1px' }}>
            <input
                type="checkbox"
                data-testid={EntitySelectTestId}
                value={value}
                onChange={(e) => onToggleSelect(e.target.checked, id)}
            />
            <ul>
                <li>
                    Id: <span>{id}</span>
                </li>
                <li>
                    Category: <span data-testid={EntityCategoryTestId}>{value}</span>
                </li>
            </ul>
            <button data-testid={EntityDeleteTestId} onClick={onDelete}>
                Delete
            </button>
        </div>
    );
}
