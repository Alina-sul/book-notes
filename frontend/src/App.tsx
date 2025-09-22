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
        <div className="header-content">
          <h1>📚 Book Notes</h1>
          <nav className="main-nav">
            <a href="#books" className="nav-link">Books</a>
            <a href="#notes" className="nav-link">Notes</a>
            <a href="#analysis" className="nav-link">Reading Analysis</a>
          </nav>
        </div>
      </header>

      <main className="App-main">
        <BookForm onBookCreated={handleBookCreated} />
      </main>
    </div>
  );
}

export default App;
