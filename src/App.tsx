import './styles/styles.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Stocks from 'routes/Stocks';
import MainHome from 'routes/MainHome';

export default function App() {
  return (
    <Router>
      <div className="outermostWrapper d-flex flex-column p-0">
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </div>
    </Router>
  );
}
