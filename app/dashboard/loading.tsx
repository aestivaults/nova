export default function Loader() {
  return (
    <div className="loader-container">
      <div />
      <div className="overlay">
        <p className="nova-text">AureusNova</p>
        <div className="dots-container">
          <span className="dot animate-bounce1"></span>
          <span className="dot animate-bounce2"></span>
          <span className="dot animate-bounce3"></span>
        </div>
        <p className="subtext">Connecting to the decentralized future...</p>
      </div>
    </div>
  );
}
