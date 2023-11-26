export const InputLimit = ({ limit }: { limit: string }) => {
  const handleChangeSelect = (e: number) => {
    const baseUrl = window.location.origin;
    window.history.replaceState({}, document.title, baseUrl);
    const url = new URL(baseUrl);
    url.searchParams.set('limit', e.toString());
    window.location.href = url.toString();
  };

  return (
    <>
      <select
        data-testid="input-limit"
        onChange={(e) => handleChangeSelect(Number(e.target.value))}
        className="m-0 p-0 border-0 rounded-2"
        name="limit"
        id="limit"
        style={{ cursor: 'pointer' }}
      >
        <option value={limit}>current limit: {limit}</option>
        <option value="25">25</option>
        <option value="20">20</option>
        <option value="15">15</option>
        <option value="10">10</option>
      </select>
    </>
  );
};
