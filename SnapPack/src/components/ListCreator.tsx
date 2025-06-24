import {useEffect, useState} from "react";
import './ListCreator.css';
import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import SubjectCreator from './SubjectCreator.tsx';
import HoverButton from "./HoverButton.tsx";

interface ListItem {
    id: string;
    text: string;
    subj?: string[];
}

interface CartListItem {
    id: string;
    text: string;
    subj?: string[];
}

interface ListCreatorProps {
    cartItems: CartListItem[];
    setCartItems: (items: CartListItem[]) => void;
}

const ListCreator = ({ cartItems, setCartItems }: ListCreatorProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [lists, setLists] = useState<ListItem[]>([]);

    useEffect(() => {
        console.log('Cart updated:', cartItems.length);
        document.documentElement.style.setProperty(
            '--cart-items-count',
            `"${cartItems.length}"`
        );
    }, [cartItems]);

    const handleAddList = () => {
        if (!inputValue.trim()) return;
        setLists([
            ...lists,
            {
                id: Date.now().toString(),
                text: inputValue
            }
        ]);
        setInputValue("");
    };

    const removeList = (idToRemove: string) => {
        setLists(lists.filter(item => item.id !== idToRemove));
    };

    const CartAddList = (idToAdd: string) => {
        const itemToAdd = lists.find(item => item.id === idToAdd);
        if (itemToAdd) {
            setLists(prevLists => prevLists.filter(item => item.id !== idToAdd));
            setCartItems([...cartItems, itemToAdd]);
        }
    };

    const handleKeyPress = (e:any) => {
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
                                <div onClick={() => CartAddList(item.id)} className="btn">
                                    <HoverButton/>
                                </div>
                                <div onClick={() => removeList(item.id)} className="delete-btn">
                                    <HoverButtonCampfire/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SubjectCreator/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListCreator;
