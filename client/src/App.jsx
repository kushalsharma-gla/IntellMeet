import Navbar from './components/Navbar'

function App() {
  function handleClick() {
  alert("Welcome to IntellMeet!")
}
  return (
    <div>
      <Navbar />

      <main className="hero">
        <h1>AI-Powered Meeting Platform</h1>

        <p>
          Conduct smarter meetings with video, chat and
          AI-powered collaboration tools.
        </p>

        <button className="get-started" onClick={handleClick}>
  Get Started
</button>
      </main>
    </div>
  )
}

export default App