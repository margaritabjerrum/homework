import './app.css';
import Header from './components/header';
import UserInputs from './components/user-inputs';
import { useSelector } from 'react-redux';
import DataGridPage from './components/data-grid-page';

function App() {
  const userInput = useSelector((state) => state.userData.value.userInputData)
  return (
    <>
      <Header />
      <UserInputs />
      {userInput && <DataGridPage />}
    </>
  );
}

export default App;
