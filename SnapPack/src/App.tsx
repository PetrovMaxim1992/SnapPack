import './App.css'
import './components/fonts/fonts.css';
import HoverButton from './components/HoverButton.tsx';
import ListCreator from './components/ListCreator.tsx';

function App() {
  return (
    <>
        <div className='header'>
            <div className='header_container'>
                <span>Snap</span>
                <HoverButton/>

                <span>Pack</span>
            </div>
            <h1>Pack your backpack easily</h1>
        </div>
        <div className='listField'>
            <ListCreator/>
        </div>
    </>
  )
}

export default App
