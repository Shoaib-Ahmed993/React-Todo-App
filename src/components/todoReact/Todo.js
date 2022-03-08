import React, { useEffect, useState } from 'react';
import './style.css';

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");

    if (lists) {
        return JSON.parse(lists);
    }
    else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, settoggleButton] = useState(false);

    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data first!!");
        }
        else if (inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return {
                            ...curElem,
                            name: inputData
                        }
                    }
                    return curElem;
                })
            );

            setInputData([]);
            setisEditItem(null);
            settoggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            // setItems([...items, inputData]);
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }

    const editItem = (index) => {
        const edited_todo_item = items.find((curElem) => {
            return curElem.id === index;
        });

        setInputData(edited_todo_item.name);
        setisEditItem(index);
        settoggleButton(true);
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems)
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    }, [items])
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍ Add Item' className='form-control'
                            value={inputData} onChange={(e) => setInputData(e.target.value)} />

                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>

                    <div className='showItems'>

                        {
                            items.map((curElem) => {
                                return (
                                    <div className='eachItem' key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className='showItems'>
                        <button className='btn effect04 ' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;