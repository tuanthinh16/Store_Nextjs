// app/page.js
'use client'
import { useState } from 'react';

export default function Home() {
    const [data, setData] = useState(null);
    const [isSending, setIsSending] = useState(false);  // Thêm state để quản lý trạng thái nút

    const handleStart = async () => {
        setIsSending(true);  // Khi bắt đầu gửi yêu cầu, đặt trạng thái là "Sending..."

        try {
            const response = await fetch('/api/xkucoin/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ initData: 'your-init-data' })
            });

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        } finally {
            setIsSending(false);  // Sau khi hoàn tất, đặt lại trạng thái nút
        }
    };

    return (
        <div className='center'>
            <h1 className='text-red-500'>Start Tsubasa Game</h1>
            <button className='bg-green-400 rounded-lg text-white' onClick={handleStart} disabled={isSending}>
                {isSending ? 'Sending...' : 'Start API Call'}
            </button>
            {data && <pre className='text-green-400 font-semibold'>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
