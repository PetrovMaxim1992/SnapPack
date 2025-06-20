import {useState} from "react";
import './HoverButton.css'
function HoverButton() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={isHovered ? 'src/assets/PackOpen.svg' : 'src/assets/PackClose.svg'} alt="Button icon"/>
        </button>
    );
}
export default HoverButton