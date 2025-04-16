// EnrollModal.jsx
import { useState } from 'react';
import { useEnrollMutation } from './useEnrollment';

export default function EnrollModal({ courseId, onClose }) {
  const [email, setEmail] = useState('');
  const { mutate, isPending, isError } = useEnrollMutation(courseId);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(email, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Enroll to Course</h3>
        {isError && <p className="error">Enrollment failed</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
          <button type="submit" disabled={isPending}>
            {isPending ? 'Processing...' : 'Confirm'}
          </button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}