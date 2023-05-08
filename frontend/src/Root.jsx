import ErrorBoundary from "./components/errorboundary/ErrorBoundary"

function Root() {
    return (
        <ErrorBoundary>
        <section className="tabs">
        <div className="tabs-container">
          <a Link to="/" className="tab" href="#start">
            Start
          </a>
          <a className="tab" href="#profile">
            Profile
          </a>
          <a Link to="/contact" className="tab" href="#contact">
            Contact
          </a>
          <a Link to="/login" className="tab" href="#login">
            Login/Sign Up
          </a>
        </div>
      </section>
      </ErrorBoundary>
    )
}

export default Root