import {useState} from "react";

import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import './SubjectCreator.css';
function SubjectCreator() {
    const [inputSubjectValue, setInputSubjectValue] = useState<string>(""); //состояние для введенного значения
    const [subjects, setSubjects] = useState<string[]>([]); //состояние для списка листов

    //-------- Добавление нового list
    const handleAddSubj = () => {
        if (!inputSubjectValue.trim()) return; // удаляем пустые значения в начале и конце строки, если после этого строка осталась пустой функция завершается
        setSubjects([...subjects, inputSubjectValue]); //обновляем состояние,добавляя новый элемент 'inputSubjectValue'
        setInputSubjectValue(""); // Очищаем поле ввода (обнуляем состояние)
    };

    //--------- Удаление list по индексу
    const removeSubj = (indexToRemove:number) => {
        const newSubjects = subjects.filter((item:string, currentIndex) => {
            return currentIndex !== indexToRemove;
        });
        setLists(newSubjects);
    };

    //---------- Обработка нажатия Enter
    const handleKeySubjPress = (e) => {
        if (e.key === "Enter") {
            handleAddSubj();
        }
    };

    return (
        <div className="div-creator">
            <div className="controls">
                <input
                    type="text"
                    value={inputSubjectValue}
                    onChange={(e) => setInputSubjectValue(e.target.value)}
                    onKeyPress={handleKeySubjPress}
                    placeholder="List name"
                />
                <button onClick={handleAddSubj}>Create new subject</button>
            </div>

            <div className="subjects-container">
                {subjects.map((text, index) => (
                    <div key={index} className="custom-subject-list">
                        <span>{text}</span>
                        <div className='buttons-conteiner'>
                            <button
                                onClick={() => removeSubj(index)}
                                className="delete-btn">
                                <HoverButtonCampfire/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default SubjectCreator;