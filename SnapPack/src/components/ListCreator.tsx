import {useState} from "react";
import './ListCreator.css';
import HoverButton from "./HoverButton.tsx";
import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
function ListCreator() {
    const [inputValue, setInputValue] = useState("");
    const [lists, setDivs] = useState([]);

    // Добавление нового div
    const handleAddDiv = () => {
        if (!inputValue.trim()) return; // Игнорируем пустые значения

        setDivs([...lists, inputValue]);
        setInputValue(""); // Очищаем поле ввода
    };

    // Удаление div по индексу
    const removeList = (index) => {
        setDivs(lists.filter((_, i) => i !== index));
    };

    // Обработка нажатия Enter
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddDiv();
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
                <button onClick={handleAddDiv}>Создать div</button>
            </div>

            <div className="lists-container">
                {lists.map((text, index) => (
                    <div key={index} className="custom-list">
                        <span>{text}</span>
                        <button>
                            <HoverButton/>
                        </button>

                        <button
                            onClick={() => removeList(index)}
                            className="delete-btn"
                        >
                            <HoverButtonCampfire/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListCreator;