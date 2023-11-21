'use client';
// import { setLimit } from '../../features/limit/limit-slice';
// import { useDispatch } from 'react-redux';

export const InputLimit = () => {
  // const dispatch = useDispatch();

  return (
    <>
      <select
        data-testid="input-limit"
        // onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
        onChange={(e) => console.log(Number(e.target.value))}
        className="m-0 p-0 border-0 rounded-2"
        name="limit"
        id="limit"
        style={{ cursor: 'pointer' }}
      >
        <option value="10">10</option>
        <option defaultValue="9">9</option>
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
};
