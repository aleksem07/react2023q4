export const InputLimit = ({ limit }: { limit: string }) => {
  const handleChangeSelect = (e: number) => {
    if (!e || e <= 0) {
      window.location.href = '/';
      return;
    }
    if (e && e !== Number(limit)) {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      url.searchParams.set('limit', e.toString());
      window.location.href = url.toString();
    }
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
