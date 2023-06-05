import './app.css';
import Header from './components/header';
import UserInputs from './components/user-inputs';
import { useSelector } from 'react-redux';
import DataGridTable from './components/data-grid-table';

function App() {
  const userInput = useSelector((state) => state.userData.value.userInputData)
  return (
    <>
      <Header />
      <UserInputs />
      {userInput && <DataGridTable />}
    </>
  );
}

export default App;
