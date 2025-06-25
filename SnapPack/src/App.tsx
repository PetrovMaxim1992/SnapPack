import './App.css'
import { useState } from 'react';
import './components/fonts/fonts.css';
import HoverButton from './components/HoverButton.tsx';
import ListCreator from './components/ListCreator.tsx';
import Modal from './components/Modal.tsx';
import HoverButtonCampfire from "./components/HoverButtonCampfire.tsx";

interface CartListItem {
    id: string;
    text: string;
    subj?: string[];
}

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartListItem[]>([]);

    const removeList = (idToRemove: string) => {
        setCartItems(cartItems.filter(item => item.id !== idToRemove));
    };

    return (
        <>
            <div className='header'>
                <div className='header_container'>
                    <span>Snap</span>
                    <div onClick={() => setIsModalOpen(true)} style={{ display: 'contents' }}>
                        <HoverButton />
                    </div>
                    <span>Pack</span>
                </div>
                <h1>Pack your backpack easily</h1>
            </div>

            <div className='listField'>
                <ListCreator
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <h2 className = "cart-items-container">List of Lists</h2>
                <div className="cart-items-container">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                {item.text}
                                <div onClick={() => removeList(item.id)} className="delete-btn">
                                    <HoverButtonCampfire/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-cart">Your lists are stacked here</div>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default App;