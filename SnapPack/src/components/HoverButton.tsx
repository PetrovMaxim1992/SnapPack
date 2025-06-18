import {useState} from "react";
import './HoverButton.css'
import PackOpen from '../assets/PackOpen.svg?react';
import PackClose from '../assets/PackClose.svg?react';

function HoverButton() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? <PackOpen/> : <PackClose/>}
        </button>
    );
}
export default HoverButton