import { useEffect, useState } from "react";
import "./App.css";
 
function App() {
  const [ws, setWs] = useState(null);
  const [dados, setDados] = useState({});
  const [status, setStatus] = useState("Desconectado");
 
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.0.120:81");
    socket.onopen = () => setStatus("✅ Conectado");
    socket.onclose = () => setStatus("❌ Desconectado");
    socket.onmessage = (event) => {
      try {
        setDados(JSON.parse(event.data));
      } catch {}
    };
    setWs(socket);
    return () => socket.close();
  }, []);
 
  const enviar = (msg) => {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(msg);
  };
 
  return (
    <div className="container">
      <h1>Painel da Horta Automatizada</h1>
      <p>{status}</p>
 
      {dados.temp !== undefined && (
        <div className="info">
          <p>🌡️ Temperatura: {dados.temp}°C</p>
          <p>💧 Umidade 1: {dados.umid1}%</p>
          <p>💧 Umidade 2: {dados.umid2}%</p>
          <p>💡 Luz: {dados.lampada ? "Ligada" : "Desligada"}</p>
          <p>🪣 Bomba 1: {dados.b1 ? "Ligada" : "Desligada"}</p>
          <p>🪣 Bomba 2: {dados.b2 ? "Ligada" : "Desligada"}</p>
          <p>⚙️ Modo: {dados.auto ? "Automático" : "Manual"}</p>
        </div>
      )}
 
      <div className="controles">
        <h2>🔘 Modo</h2>
        <button onClick={() => enviar("modo_auto")}>Automático</button>
        <button onClick={() => enviar("modo_manual")}>Manual</button>
 
        {!dados.auto && (
          <>
            <h2>💡 Luz</h2>
            <button onClick={() => enviar("lampada_on")}>Ligar</button>
            <button onClick={() => enviar("lampada_off")}>Desligar</button>
 
            <h2>🪣 Bombas</h2>
            <button onClick={() => enviar("b1_on")}>B1 ON</button>
            <button onClick={() => enviar("b1_off")}>B1 OFF</button>
            <button onClick={() => enviar("b2_on")}>B2 ON</button>
            <button onClick={() => enviar("b2_off")}>B2 OFF</button>
          </>
        )}
      </div>
    </div>
  );
}
 
export default App;
 
 