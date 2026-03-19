import {useEffect, useState} from "react";
import './ListCreator.css';
import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import SubjectCreator from './SubjectCreator.tsx';
import HoverButton from "./HoverButton.tsx";
import React from "react";

interface SubjItem {
    id: string;
    text: string;
}

interface ListItem {
    id: string;
    text: string;
    subj?: SubjItem[];
}

interface CartListItem {
    id: string;
    text: string;
    subj?: SubjItem[];
}

interface ListCreatorProps {
    lists: ListItem[];
    setLists: (items: ListItem[]) => void;
    cartItems: CartListItem[];
    onAddToCart: (id: string) => void;
    // setCartItems не нужен, так как не используется
}

const ListCreator = ({ lists, setLists, cartItems, onAddToCart }: ListCreatorProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        console.log('Cart updated:', cartItems.length);
        document.documentElement.style.setProperty(
            '--cart-items-count',
            `"${cartItems.length}"`
        );
    }, [cartItems]);

    const handleAddList = () => {
        if (!inputValue.trim()) return;

        const newId = Date.now().toString();
        const newList: ListItem = {
            id: newId,
            text: inputValue,
            subj: []
        };

        setLists([...lists, newList]);
        localStorage.setItem(newId, inputValue);
        setInputValue("");
    };

    const updateListSubjects = (listId: string, newSubjects: SubjItem[]) => {
        setLists(lists.map(list =>
            list.id === listId
                ? { ...list, subj: newSubjects }
                : list
        ));
    };

    const removeList = (idToRemove: string) => {
        setLists(lists.filter(item => item.id !== idToRemove));
        localStorage.removeItem(idToRemove);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleAddList();
        }
    };

    return (
        <div className="div-creator">
            <div className="controls">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="List name"
                />
                <button className="controls_button" onClick={handleAddList}>Create new list</button>
            </div>
            <div className="lists-container">
                {lists.map((item) => (
                    <div key={item.id} className="custom-list">
                        <div className="lists-input-container">
                            <span>{item.text}</span>
                            <div className='buttons-container'>
                                <div onClick={() => onAddToCart(item.id)} className="btn">
                                    <HoverButton/>
                                </div>
                                <div onClick={() => removeList(item.id)} className="delete-btn">
                                    <HoverButtonCampfire/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SubjectCreator
                                subjects={item.subj || []}
                                onUpdateSubjects={(newSubjects) => updateListSubjects(item.id, newSubjects)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCreator;