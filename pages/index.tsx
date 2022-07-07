import { stringify } from "querystring";
import { useState } from "react";

export default function Index() {
    const [items, setItems] = useState<{name: string, completed: boolean}[]>([]);
    const [newItemName, setNewItemName] = useState("");

    function onAdd() {
        const newItem = {
            name: newItemName,
            completed: false,
        };

        setItems([newItem, ...items]); // array with new + existing (copied) items

        setNewItemName(""); // clear the newItemName state
    }

    function onDone(i: number) {
        let newItems = [...items]; // 'let' means value of var can be changed before use
        newItems[i].completed = !newItems[i].completed;
        setItems(newItems);
    }

    function onDelete(i: number) {
        let newItems = [...items];
        newItems.splice(i, 1);
        setItems(newItems);
    }

    function onDeleteAll() {
        setItems([]);
    }

    function onDeleteAllCompleted() {
        // setItems(items.filter(d => d.completed === false));
        setItems(items.filter(d => !d.completed));
    }

    return (
        <>
            <input value={newItemName} onChange={e => setNewItemName(e.target.value)}/>
            <button onClick={onAdd}>Add</button>
            <button onClick={onDeleteAll}>Delete all</button>
            <button onClick={onDeleteAllCompleted}>Delete all completed</button>

            {/* i indicates index of item */}
            {items.map((d, i) => ( 
                <>
                    <p className={d.completed ? "line-through" : ""}>{d.name}</p>
                    <button onClick={() => onDone(i)}>Mark {d.completed ? "not done" : "done"}</button>
                    <button onClick={() => onDelete(i)}>Delete</button>
                </>
            ))}
        </>
    );
}
