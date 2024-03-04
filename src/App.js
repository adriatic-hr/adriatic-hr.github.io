
import './App.css'
import ListingsPage from './pages/ListingsPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <ListingsPage />
      </Container>
    </div>
  );
}

export default App;
