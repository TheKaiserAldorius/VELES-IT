import React, { useState, useEffect } from "react";
import SEO from "../components/SEO/SEO.jsx";

export default function AdminPage() {
  const [boards, setBoards] = useState([]);
  const [abacusLogs, setAbacusLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загрузка досок при старте
  useEffect(() => {
    setLoading(true);
    fetch("/api/trello/boards/")
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.boards || []);
        setLoading(false);
      });
  }, []);

  // Декомпозиция задачи
  const handleDecompose = async (taskName) => {
    setLoading(true);
    try {
      const response = await fetch("/api/abacus/decompose/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task_name: taskName }),
      });
      const result = await response.json();

      setAbacusLogs((prev) => [
        ...prev,
        { task: taskName, result: result.decomposition || "Ошибка!" },
      ]);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <SEO
        title="Админка | Veles IT"
        description="Административная панель Veles IT."
        keywords="Veles IT, админка, панель управления"
      />
      <h1>Админка VELES-IT</h1>

      {loading && <div className="loader">Загрузка...</div>}

      <section>
        <h2>Доски Trello</h2>
        {boards.length > 0 ? (
          <div className="board-list">
            {boards.map((board) => (
              <div key={board.id} className="board-card">
                <h3>{board.name}</h3>
                <button
                  onClick={() => handleDecompose(board.name)}
                  disabled={loading}
                >
                  Декомпозировать
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Нет данных. Проверьте подключение к Trello.</p>
        )}
      </section>

      <section>
        <h2>Логи Abacus</h2>
        <ul className="logs">
          {abacusLogs.map((log, index) => (
            <li key={index}>
              <strong>{log.task}</strong>: {log.result}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
