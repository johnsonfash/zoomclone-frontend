import { Provider } from 'react-redux';
import store from './store';
import Join from './pages/join'
import RTC from './pages/rtc'
import Login from './pages/login'
import Register from './pages/register'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isRegistered } from './services/auth';

const PrivateRoute = ({ component: Component }) => {
  const auth = isRegistered();
  window && window.scrollTo(0, 0);
  return !auth ? <Component /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/regiter" element={<Register />} />
          <Route path="/" element={<Join />} />
          <Route path="/:id" element={<RTC />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
