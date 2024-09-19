// app/page.js
'use client'
import { SetStateAction, useState } from 'react';

export default function Home() {
    const [dataTsu, setDataTsu] = useState(null);
    const [isSendingTsu, setIsSendingTsu] = useState(false);
    const [countRepeatTsu, setCountRepeatTsu] = useState("");
    const [countDelayTsu, setCountDelayTsu] = useState("");
    const [tsuError, setTsuError] = useState("");

    const [dataKu, setDataKu] = useState(null);
    const [isSendingKu, setIsSendingKu] = useState(false);
    const [countRepeatKu, setCountRepeatKu] = useState("");
    const [countDelayKu, setCountDelayKu] = useState("");
    const [kuError, setKuError] = useState("");

    const handleStartTsu = async () => {
        // Validate inputs
        if (!countRepeatTsu || !countDelayTsu) {
            setTsuError("Both fields are required.");
            return;
        }
        setTsuError(""); // Clear any previous errors
        setIsSendingTsu(true);

        try {
            const response = await fetch('/api/tsubasa/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'count-repeat': countRepeatTsu, 'count-delay': countDelayTsu })
            });

            const result = await response.json();
            setDataTsu(result);
        } catch (error) {
            console.error("Error during request:", error);
        } finally {
            setIsSendingTsu(false);
        }
    };

    const handleStartKu = async () => {
        // Validate inputs
        if (!countRepeatKu || !countDelayKu) {
            setKuError("Both fields are required.");
            return;
        }
        setKuError(""); // Clear any previous errors
        setIsSendingKu(true);

        try {
            const response = await fetch('/api/xkucoin/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'count-repeat': countRepeatKu, 'count-delay': countDelayKu })
            });

            const result = await response.json();
            setDataKu(result);
        } catch (error) {
            console.error("Error during request:", error);
        } finally {
            setIsSendingKu(false);
        }
    };

    const handleCountRepeatChange = (e: { target: { value: SetStateAction<string>; }; }) => setCountRepeatTsu(e.target.value);
    const handleCountDelayChange = (e: { target: { value: SetStateAction<string>; }; }) => setCountDelayTsu(e.target.value);

    const handleCountRepeatChangeKu = (e: { target: { value: SetStateAction<string>; }; }) => setCountRepeatKu(e.target.value);
    const handleCountDelayChangeKu = (e: { target: { value: SetStateAction<string>; }; }) => setCountDelayKu(e.target.value);

    return (
        <div className="flex flex-col items-center p-8 space-y-12">
            <div className="border p-6 rounded-lg shadow-md w-80 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Start Tsubasa Game</h1>
                <div className="mb-4">
                    <label htmlFor="count-repeat-tsu" className="block mb-1">Count Repeat:</label>
                    <input type="text" id="count-repeat-tsu" placeholder='1000' value={countRepeatTsu} onChange={handleCountRepeatChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label htmlFor="time-delay-tsu" className="block mb-1">Time Delay:</label>
                    <input type="text" id="time-delay-tsu" placeholder='60' value={countDelayTsu} onChange={handleCountDelayChange} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                {tsuError && <p className="text-red-500 mb-4">{tsuError}</p>}
                <button onClick={handleStartTsu} disabled={isSendingTsu} className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
                    {isSendingTsu ? 'Sending...' : 'Start API Call'}
                </button>
                {dataTsu && <pre className="mt-4 bg-white p-2 rounded-lg">{JSON.stringify(dataTsu, null, 2)}</pre>}
            </div>

            <div className="border p-6 rounded-lg shadow-md w-80 bg-gray-100">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Start XKucoin Game</h1>
                <div className="mb-4">
                    <label htmlFor="count-repeat-ku" className="block mb-1">Count Repeat:</label>
                    <input type="text" id="count-repeat-ku" placeholder='1000' value={countRepeatKu} onChange={handleCountRepeatChangeKu} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div className="mb-4">
                    <label htmlFor="time-delay-ku" className="block mb-1">Time Delay:</label>
                    <input type="text" id="time-delay-ku" placeholder='200' value={countDelayKu} onChange={handleCountDelayChangeKu} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                {kuError && <p className="text-red-500 mb-4">{kuError}</p>}
                <button onClick={handleStartKu} disabled={isSendingKu} className="bg-green-400 text-white px-4 py-2 rounded-lg w-full">
                    {isSendingKu ? 'Sending...' : 'Start API Call'}
                </button>
                {dataKu && <pre className="mt-4 bg-white p-2 rounded-lg text-green-500">{JSON.stringify(dataKu, null, 2)}</pre>}
            </div>
        </div>
    );
}
