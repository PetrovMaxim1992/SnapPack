import {useState} from "react";
import './HoverButtonCampfire.css'
function HoverButtonCampfire() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className='campfireButton' src={isHovered ? 'src/assets/campfireOn.svg' : 'src/assets/campfireOff.svg'} alt="Button icon"/>
        </button>
    );
}
export default HoverButtonCampfire