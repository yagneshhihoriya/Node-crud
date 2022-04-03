import './App.css';
import 'rsuite/dist/rsuite.min.css';
import { RatingsComponent } from './components/RatingComponent';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
          Hotel Rating
        </h1>
        <RatingsComponent />
      </header>
    </div>
  );
}

export default App;
