import {useState} from "react";
import './HoverButtonCampfire.css'
import CampfireOn from '../assets/campfireOn.svg?react';
import CampfireOff from '../assets/campfireOff.svg?react';

function HoverButtonCampfire() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? <CampfireOn/> : <CampfireOff/>}
        </button>
    );
}
export default HoverButtonCampfire