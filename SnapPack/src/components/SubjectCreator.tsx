import {useState} from "react";

interface SubjItem{
    id: string;
    text: string;
}

import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import './SubjectCreator.css';
function SubjectCreator() {
    const [inputSubjectValue, setInputSubjectValue] = useState<string>(""); //состояние для введенного значения
    const [subjects, setSubjects] = useState<SubjItem[]>([]); //состояние для списка листов

    //-------- Добавление нового subj
    const handleAddSubj = () => {
        if (!inputSubjectValue.trim()) return; // удаляем пустые значения в начале и конце строки, если после этого строка осталась пустой функция завершается
        setSubjects([ //обновляем состояние,добавляя новый элемент 'inputValue'
            ...subjects,
            {
                id: Date.now().toString(), // Генерируем уникальный ID
                text: inputSubjectValue
            }
        ]);
        setInputSubjectValue(""); // Очищаем поле ввода (обнуляем состояние)
    };

    //--------- Удаление subj по индексу
    const removeSubj = (idToRemove: string) => {
        setSubjects(subjects.filter(item => item.id !== idToRemove));
    };

    //---------- Обработка нажатия Enter
    const handleKeySubjPress = (e:any) => {
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
                    onKeyDown={handleKeySubjPress}
                    placeholder="Subject name"
                />
                <button onClick={handleAddSubj}>Create new subject</button>
            </div>

            <div className="subjects-container">
                {subjects.map((item) => (
                    <div key={item.id} className="custom-subject-list">
                        <span>{item.text}</span>
                        <div className='buttons-conteiner'>
                            <div
                                onClick={() => removeSubj(item.id)}
                                className="delete-btn">
                                <HoverButtonCampfire/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default SubjectCreator;