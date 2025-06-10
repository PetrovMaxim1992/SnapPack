import './App.css'
import HoverButton from './components/HoverButton.tsx';
function App() {


  return (
    <>
        <div className='header'>
            <div>
                <span>Snap</span>
                <HoverButton />
                <span>Pack</span>
            </div>
            <h1>Pack your backpack easily</h1>
        </div>
    </>
  )
}


export default App
