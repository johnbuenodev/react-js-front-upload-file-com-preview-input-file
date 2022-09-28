import './App.css';
import { FaFileImage } from 'react-icons/fa';
import FileUpload from './components/FileUpload';

const App = () => (
    <div className="container mt-5">
      <h4 className="display-5 text-center mb-5">
       <FaFileImage/> React File Upload 
      </h4>

      <FileUpload />
    </div>
);

export default App;
