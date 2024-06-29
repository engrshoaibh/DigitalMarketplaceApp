import React from 'react';

function SuccessModal({ onClose }) {
  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Success!</h3>
        <p className="py-4">Your password reset request has been received. Please check your email.</p>
        <div className="flex justify-center py-4">
          <img src="path_to_success_gif.gif" alt="Success" className="w-24 h-24" />
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
}

export default SuccessModal;
