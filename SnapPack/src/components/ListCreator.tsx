import {useState} from "react";
import './ListCreator.css';
import HoverButton from "./HoverButton.tsx";
import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import SubjectCreator from './SubjectCreator.tsx';

interface ListItem {
    id: string;
    text: string;
}

function ListCreator() {
    const [inputValue, setInputValue] = useState<string>(""); //состояние для введенного значения
    const [lists, setLists] = useState<ListItem[]>([]); //состояние для списка листов

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

    //--------- Удаление list по индексу
    const removeList = (idToRemove: string) => {
        setLists(lists.filter(item => item.id !== idToRemove));
    };

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
                <button onClick={handleAddList}>Create new list</button>
            </div>
            <div className="lists-container">
                {lists.map((item) => (
                    <div key={item.id} className="custom-list">
                        <div className="lists-input-container">
                            <span>{item.text}</span>
                            <div className='buttons-container'>
                                <div
                                    className = 'add-btn'>
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