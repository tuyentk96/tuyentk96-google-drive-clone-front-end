
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'
import Header from './components/Home/Header/Header';
import Navbar from './components/Home/Navbar/Navbar';
import { useSelector } from 'react-redux';


function App() {

  const userId = useSelector(state => state.auth.userId)


  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className={userId ? '' : 'hidden'}>
          <Header />
        </div>
        <div className="flex flex-1">
          <div className={userId ? '' : 'hidden'}>
            <Navbar />
          </div>
          <div className="flex-1 bg-white p-4 rounded-tl-3xl shadow-inner">
            <AppRoutes />
          </div>
        </div>
      </div>
    </Router>
  );

}
export default App
