import { useState } from "react";
import React from "react";
import HoverButtonCampfire from "./HoverButtonCampfire.tsx";
import './SubjectCreator.css';

interface SubjItem {
    id: string;
    text: string;
}

interface SubjectCreatorProps {
    listId?: string; // делаем опциональным, так как может не использоваться
    subjects: SubjItem[];
    onUpdateSubjects: (subjects: SubjItem[]) => void;
}

function SubjectCreator({ subjects, onUpdateSubjects }: SubjectCreatorProps) {
    const [inputSubjectValue, setInputSubjectValue] = useState<string>("");

    const handleAddSubj = () => {
        if (!inputSubjectValue.trim()) return;

        const newSubject: SubjItem = {
            id: Date.now().toString(),
            text: inputSubjectValue
        };

        onUpdateSubjects([...subjects, newSubject]);
        setInputSubjectValue("");
    };

    const removeSubj = (idToRemove: string) => {
        onUpdateSubjects(subjects.filter(item => item.id !== idToRemove));
    };

    const handleKeySubjPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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