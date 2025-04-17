// frontend/src/components/AbacusManager.js
import React, { useState } from 'react';

export default function AbacusManager() {
  const [data, setData] = useState('');

  const fetchAbacusData = async () => {
    const response = await fetch('/api/abacus/');
    const result = await response.json();
    setData(JSON.stringify(result, null, 2));
  };

  const sendToAbacus = async () => {
    await fetch('/api/abacus/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sync' }),
    });
    alert('Данные отправлены в Abacus!');
  };

  return (
    <div className="abacus-manager">
      <button className="btn" onClick={fetchAbacusData}>Загрузить данные</button>
      <button className="btn" onClick={sendToAbacus}>Синхронизировать с Abacus</button>
      
      {data && (
        <pre className="data-display">{data}</pre>
      )}
    </div>
  );
}