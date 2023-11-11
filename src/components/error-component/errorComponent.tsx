import React, { useState } from 'react';

export default function ErrorComponent(): JSX.Element {
  const [hasError, setError] = useState(false);

  const handlerErrorClick = () => {
    throw new Error('Error button clicked');
  };

  const setErrorTrue = () => {
    setError(true);
  };

  if (hasError) {
    handlerErrorClick();
  }

  return (
    <button
      type="button"
      className="btn btn-danger w-25 mb-3"
      onClick={setErrorTrue}
    >
      Button-error
    </button>
  );
}
