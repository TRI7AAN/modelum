"use client";
import { useState } from "react";

export default function BlueprintDemo() {
  const [houseImg, setHouseImg] = useState<string | null>(null);
  const [cryptoImg, setCryptoImg] = useState<string | null>(null);
  const [robotImg, setRobotImg] = useState<string | null>(null);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  // Example default values
  const [floors, setFloors] = useState(2);
  const [rooms, setRooms] = useState(3);
  const [sqft, setSqft] = useState(1200);
  const [investmentType, setInvestmentType] = useState("ethereum");
  const [budget, setBudget] = useState(200000);
  const [robotType, setRobotType] = useState("fighting");

  const API = "http://localhost:5000";

  async function handleHouse() {
    setLoading("house"); setError("");
    try {
      const res = await fetch(`${API}/generate_house`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ floors, rooms, sqft })
      });
      const data = await res.json();
      if (data.image) setHouseImg(`${API}${data.image}`);
      else setError(data.error || "Unknown error");
    } catch (e) { setError("Failed to connect to backend"); }
    setLoading("");
  }

  async function handleCrypto() {
    setLoading("crypto"); setError("");
    try {
      const res = await fetch(`${API}/generate_crypto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investment_type: investmentType, budget })
      });
      const data = await res.json();
      if (data.image) setCryptoImg(`${API}${data.image}`);
      else setError(data.error || "Unknown error");
    } catch (e) { setError("Failed to connect to backend"); }
    setLoading("");
  }

  async function handleRobot() {
    setLoading("robot"); setError("");
    try {
      const res = await fetch(`${API}/generate_robot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ robot_type: robotType })
      });
      const data = await res.json();
      if (data.image) setRobotImg(`${API}${data.image}`);
      else setError(data.error || "Unknown error");
    } catch (e) { setError("Failed to connect to backend"); }
    setLoading("");
  }


  return (
    <div className="min-h-screen bg-[#102323] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-3 border-b border-[#224949]">
        <div className="flex items-center gap-4">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold">MODELUM</h2>
        </div>
        <a href="/" className="bg-[#0cf2f2] text-[#102323] font-bold px-5 py-2 rounded hover:bg-[#0cf2f2]/90 transition border border-[#0cf2f2]">← Back to Home</a>
      </header>

      <main className="flex-1 py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-10">
          <h1 className="text-3xl font-black mb-4 text-center tracking-tight">Blueprint & Chart Generator Demo</h1>
          {error && <div className="text-red-500 text-center font-semibold mb-4">{error}</div>}

          {/* House Blueprint */}
          <div className="bg-[#183434] border border-[#224949] rounded-xl p-6 space-y-4 shadow-lg">
            <h2 className="font-bold text-lg text-[#0cf2f2]">House Blueprint</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <input type="number" min={1} value={floors} onChange={e => setFloors(Number(e.target.value))} className="border border-[#224949] bg-[#102323] text-white px-2 py-1 rounded w-20" placeholder="Floors" />
              <input type="number" min={1} value={rooms} onChange={e => setRooms(Number(e.target.value))} className="border border-[#224949] bg-[#102323] text-white px-2 py-1 rounded w-20" placeholder="Rooms" />
              <input type="number" min={100} value={sqft} onChange={e => setSqft(Number(e.target.value))} className="border border-[#224949] bg-[#102323] text-white px-2 py-1 rounded w-24" placeholder="Sqft" />
              <button onClick={handleHouse} className="bg-[#0cf2f2] text-[#102323] font-bold px-4 py-1.5 rounded hover:bg-[#0cf2f2]/90 transition" disabled={loading==="house"}>{loading==="house" ? "Generating..." : "Generate"}</button>
            </div>
            {houseImg && <img src={houseImg} alt="House Blueprint" className="mt-2 border border-[#224949] rounded-lg bg-white" style={{maxWidth:400}} />}
          </div>

          {/* Crypto Chart */}
          <div className="bg-[#183434] border border-[#224949] rounded-xl p-6 space-y-4 shadow-lg">
            <h2 className="font-bold text-lg text-[#0cf2f2]">Crypto Chart</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <select value={investmentType} onChange={e => setInvestmentType(e.target.value)} className="border border-[#224949] bg-[#102323] text-white px-2 py-1 rounded">
                <option value="ethereum">Ethereum</option>
                <option value="bitcoin">Bitcoin</option>
              </select>
              <input type="number" min={100000} step={10000} value={budget} onChange={e => setBudget(Number(e.target.value))} className="border border-[#224949] bg-[#102323] text-white px-2 py-1 rounded w-28" placeholder="Budget (₹)" />
              <button onClick={handleCrypto} className="bg-[#0cf2f2] text-[#102323] font-bold px-4 py-1.5 rounded hover:bg-[#0cf2f2]/90 transition" disabled={loading==="crypto"}>{loading==="crypto" ? "Generating..." : "Generate"}</button>
            </div>
            {cryptoImg && <img src={cryptoImg} alt="Crypto Chart" className="mt-2 border border-[#224949] rounded-lg bg-white" style={{maxWidth:400}} />}
          </div>

          {/* Robot Blueprint */}
          <div className="bg-[#183434] border border-[#224949] rounded-xl p-6 space-y-4 shadow-lg">
            <h2 className="font-bold text-lg text-[#0cf2f2]">Robot Blueprint</h2>
            <div className="flex flex-wrap gap-3 items-center">
              <input type="text" value={robotType} onChange={e => setRobotType(e.target.value)} className="border border-[#224949] bg-[#102323] text-white px-2 py-1 rounded w-32" placeholder="Robot Type" />
              <button onClick={handleRobot} className="bg-[#0cf2f2] text-[#102323] font-bold px-4 py-1.5 rounded hover:bg-[#0cf2f2]/90 transition" disabled={loading==="robot"}>{loading==="robot" ? "Generating..." : "Generate"}</button>
            </div>
            {robotImg && <img src={robotImg} alt="Robot Blueprint" className="mt-2 border border-[#224949] rounded-lg bg-white" style={{maxWidth:400}} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#224949] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <p className="text-[#90cbcb]">© 2023 MODELUM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
