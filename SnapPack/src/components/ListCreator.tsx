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


function ListCreator() {
    const [inputValue, setInputValue] = useState<string>(""); //состояние для введенного значения
    const [lists, setLists] = useState<ListItem[]>([]); //состояние для списка листов
    const [cartLists, setCartLists] = useState<CartListItem[]>([]); //состояние для списка листов

        document.documentElement.style.setProperty(
            '--cart-items-count',
            `"${cartLists.length}"`
        );

    useEffect(() => {
        console.log('Cart updated:', cartLists.length); // Проверка в консоли
        document.documentElement.style.setProperty(
            '--cart-items-count',
            `"${cartLists.length}"`
        );
    }, [cartLists]);

    //-------- Добавление нового list
    const handleAddList = () => {
        if (!inputValue.trim()) return; // удаляем пустые значения в начале и конце строки, если после этого строка осталась пустой функция завершается
        setLists([ //обновляем состояние,добавляя новый элемент 'inputValue'
            ...lists,
                {
                    id: Date.now().toString(), // Генерируем уникальный ID
                    text: inputValue
                }
    ]);
        setInputValue(""); // Очищаем поле ввода (обнуляем состояние)

    };
    console.log(lists)

    //--------- Удаление list по индексу
    const removeList = (idToRemove: string) => {
        setLists(lists.filter(item => item.id !== idToRemove));
    };

    //--------- добавление list в корзину
    const CartAddList = (idToAdd: string) => {

        // Находим элемент, который нужно переместить
        const itemToAdd = lists.find(item => item.id === idToAdd);

        if (itemToAdd) {
            // Удаляем элемент из lists
            setLists(prevLists => prevLists.filter(item => item.id !== idToAdd));

            // Добавляем элемент в cartLists
            setCartLists(prevCartLists => [...prevCartLists, itemToAdd]);
        }
    };
    console.log(cartLists)

    //---------- Обработка нажатия Enter
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
                                <div
                                    onClick={() => CartAddList(item.id)}
                                    className="btn">
                                    <HoverButton/>
                                </div>
                                <div
                                    onClick={() => removeList(item.id)}
                                    className="delete-btn">
                                    <HoverButtonCampfire/>
                                </div>
                            </div>
                        </div>
                        <div><SubjectCreator/></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListCreator;