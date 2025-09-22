import React from 'react';
import './App.css';
import BookForm from './components/BookForm';

function App() {
  const handleBookCreated = (id: number) => {
    console.log(`Book created with ID: ${id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Book Notes</h1>
        <p>Keep track of your reading notes and thoughts</p>
      </header>

      <main className="App-main">
        <BookForm onBookCreated={handleBookCreated} />
      </main>
    </div>
  );
}

export default App;
