import {useState} from "react";
import './ListCreator.css';
import HoverButton from "./HoverButton.tsx";
import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import SubjectCreator from './SubjectCreator.tsx';

function ListCreator() {
    const [inputValue, setInputValue] = useState(""); //состояние для введенного значения
    const [lists, setLists] = useState([]); //состояние для списка листов

    //-------- Добавление нового list
    const handleAddList = () => {
        if (!inputValue.trim()) return; // удаляем пустые значения в начале и конце строки, если после этого строка осталась пустой функция завершается
        setLists([...lists, inputValue]); //обновляем состояние,добавляя новый элемент 'inputValue'
        setInputValue(""); // Очищаем поле ввода (обнуляем состояние)
    };

    //--------- Удаление list по индексу
    const removeList = (indexToRemove) => {
        const newLists = lists.filter((item, currentIndex) => {
            return currentIndex !== indexToRemove;
        });
        setLists(newLists);
    };

    //---------- Обработка нажатия Enter
    const handleKeyPress = (e) => {
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
                    onKeyPress={handleKeyPress}
                    placeholder="List name"
                />
                <button onClick={handleAddList}>Create new list</button>
            </div>

            <div className="lists-container">
                {lists.map((text, index) => (
                    <div key={index} className="custom-list">
                        <div className="lists-input-container">
                            <span>{text}</span>
                            <div className='buttons-conteiner'>
                                <button
                                    className = 'add-btn'>

                                <HoverButton/>
                                </button>
                                <button
                                    onClick={() => removeList(index)}
                                    className="delete-btn">
                                    <HoverButtonCampfire/>
                                </button>
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