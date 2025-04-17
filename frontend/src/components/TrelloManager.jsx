// frontend/src/components/TrelloManager.js
import React, { useState } from 'react';

export default function TrelloManager() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const loadBoards = async () => {
    try {
      const response = await fetch('/api/trello/boards/');
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error('Ошибка загрузки досок:', error);
    }
  };

  const loadLists = async (boardId) => {
    const response = await fetch(`/api/trello/lists/?board_id=${boardId}`);
    const data = await response.json();
    setSelectedBoard({ id: boardId, lists: data });
  };

  return (
    <div className="trello-manager">
      <button className="btn" onClick={loadBoards}>Загрузить доски</button>
      
      <div className="board-list">
        {boards.map(board => (
          <div 
            key={board.id} 
            className="board-item" 
            onClick={() => loadLists(board.id)}
          >
            {board.name}
          </div>
        ))}
      </div>

      {selectedBoard && (
        <div className="lists-container">
          <h3>Списки в доске:</h3>
          <ul>
            {selectedBoard.lists.map(list => (
              <li key={list.id}>{list.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}