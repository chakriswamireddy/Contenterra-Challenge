
import './App.css'
import TotalList from './components/TotalList'
import 'animate.css';

function App() {

  return (
    <div className='position-relative'>
      <h1 className='  text-center place-center w-100 bg-secondary position-fixed border p-2 z-3' style={{letterSpacing:3, fontFamily:'monospace', marginTop:'-80px'}}>

      <div  className='animate__animated animate__zoomIn'>
      Contenterra 
      </div>

      </h1>
      <TotalList />
    </div>
  )
}

export default App
