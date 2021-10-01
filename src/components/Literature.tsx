import * as React from 'react';
import { useState, FunctionComponent, Dispatch, SetStateAction } from 'react';

interface ILiteratureProps {
    literatureItems: string[];
    setLiteratureItems: Dispatch<SetStateAction<string[]>>;
}

const Literature: FunctionComponent<ILiteratureProps> = function ({
    literatureItems,
    setLiteratureItems
}) {
    const [newItem, setNewItem] = useState('');

    function onNewItemAdded(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (!newItem) {
            return;
        }

        setLiteratureItems([...literatureItems, newItem]);
        setNewItem('');
    }

    return (
        <div className="literature-repeater">
            <form onSubmit={onNewItemAdded}>
                <div className="input-group">
                    <input
                        type="text"
                        onChange={(ev) => setNewItem(ev.target.value)}
                        value={newItem}
                        className="form-control"
                        name="literature"
                        id="literature"
                        autoComplete="off"
                        placeholder="New literature item..."
                    />
                    <div className="input-group-append mx-1">
                        <button className="btn btn-outline-secondary">
                            Add to the List
                        </button>
                    </div>
                </div>
            </form>
            <ul className="m-3 mt-1 p-1 border border-1 b-secondary">
                {literatureItems.map((item, idx) => {
                    return (
                        <option key={idx} value={idx}>
                            {item}
                        </option>
                    );
                })}
            </ul>
        </div>
    );
};

export default Literature;
