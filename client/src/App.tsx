import './App.css'
import { useState } from 'react';
import './components/fonts/fonts.css';
import HoverButton from './components/HoverButton.tsx';
import ListCreator from './components/ListCreator.tsx';
import Modal from './components/Modal.tsx';
import HoverButtonCampfire from "./components/HoverButtonCampfire.tsx";
import AuthPage from './components/AuthPage';

// Определяем интерфейс SubjItem здесь
interface SubjItem {
    id: string;
    text: string;
}

interface ListItem {
    id: string;
    text: string;
    subj?: SubjItem[]; // теперь SubjItem определен
}

interface CartListItem {
    id: string;
    text: string;
    subj?: SubjItem[]; // теперь SubjItem определен
}

interface User {
    id: string;
    name: string;
    email: string;
}

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lists, setLists] = useState<ListItem[]>([]); // списки на поле
    const [cartItems, setCartItems] = useState<CartListItem[]>([]); // списки в корзине
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // Удалить список из корзины (навсегда)
    const removeList = (idToRemove: string) => {
        setCartItems(cartItems.filter(item => item.id !== idToRemove));
    };

    // Вернуть список из корзины обратно на поле
    const returnToList = (idToReturn: string) => {
        const itemToReturn = cartItems.find(item => item.id === idToReturn);
        if (itemToReturn) {
            setCartItems(prev => prev.filter(item => item.id !== idToReturn));
            setLists(prev => [...prev, itemToReturn as ListItem]);
        }
    };

    // Добавить список в корзину (из поля)
    const addToCart = (idToAdd: string) => {
        const itemToAdd = lists.find(item => item.id === idToAdd);
        if (itemToAdd) {
            setLists(prev => prev.filter(item => item.id !== idToAdd));
            setCartItems(prev => [...prev, itemToAdd as CartListItem]);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const handleLogin = (_token: string, userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    if (!isAuthenticated) {
        return <AuthPage onLogin={handleLogin} />;
    }

    return (
        <>
            <div className='header'>
                <div className='header_container'>
                    <span>Snap</span>
                    <div className="button-wrapper" onClick={() => setIsModalOpen(true)}>
                        <HoverButton/>
                    </div>
                    <span>Pack</span>
                </div>
                <div>
                    <h1>Pack your backpack easily, {user?.name}!</h1>
                    <button onClick={handleLogout} className="logout-btn">
                        Exit
                    </button>
                </div>
            </div>

            <div className='listField'>
                <ListCreator
                    lists={lists}
                    setLists={setLists}
                    cartItems={cartItems}
                    onAddToCart={addToCart}  // убрали setCartItems
                />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <h2 className="cart-items-container">List of Lists</h2>
                <div className="cart-items-container">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                {item.text}
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {/* Кнопка вернуть на поле */}
                                    <button
                                        onClick={() => {
                                            returnToList(item.id);
                                        }}
                                        className="return-btn"
                                    >
                                        ↩
                                    </button>
                                    {/* Кнопка удалить */}
                                    <div onClick={() => removeList(item.id)} className="delete-btn">
                                        <HoverButtonCampfire/>
                                    </div>
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