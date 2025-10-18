import { useEffect, useState } from "react";
import bilu from './Bilufoto21.jpg';
import "./App.css";
function App() {
  const [ws, setWs] = useState(null);
  const [status, setStatus] = useState("Desconectado");
  const [mensagens, setMensagens] = useState([]);
 
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.0.120/ws");
 
    socket.onopen = () => setStatus("Conectado ao ESP32 ✅");
    socket.onclose = () => setStatus("Desconectado ❌");
    socket.onmessage = (event) => {
      setMensagens((prev) => [...prev, event.data]);
    };
 
    setWs(socket);
    return () => socket.close();
  }, []);
 
  const enviar = (msg) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  };
 
  return (
    <div className="container">
      <h1>Controle de iluminação via App</h1>
      <p className="status">{status}</p>
 
      <div>
        <button onClick={() => enviar("ligar")}>💡 Ligar LED</button>
        <button onClick={() => enviar("desligar")}>💤 Desligar LED</button>
      </div>
 
      <h3>📜 Logs:</h3>
      <div className="logs">
        {mensagens.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  );
}
 
export default App;
 
 