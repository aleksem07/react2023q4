import { InputLimitProps } from './input-limit.types';

function InputLimit({ onLimitChange }: InputLimitProps) {
  const handleLimitChange = (newLimit: number) => {
    onLimitChange(newLimit);
  };

  return (
    <>
      <select
        onChange={(e) => handleLimitChange(Number(e.target.value))}
        className="m-0 p-0 border-0 rounded-2"
        name="limit"
        id="limit"
      >
        <option defaultValue="10">10</option>
        <option value="9">9</option>
        <option value="8">8</option>
        <option value="7">7</option>
        <option value="6">6</option>
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
    </>
  );
}

export default InputLimit;
