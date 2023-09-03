const CenterSearch = ({ centerSearchInput, setCenterSearchInput }) => {
  return (
    <div className="box col-md-3 col-12 relative">
      <form className="search">
        <label className="lblAbs font-13">جستجوی مرکز</label>
        <input
          onChange={(e) => setCenterSearchInput(e.target.value)}
          value={centerSearchInput}
          autoComplete="off"
          className="form-control rounded-sm font-12 articleSearchInput"
          placeholder="نام مرکز ..."
          type="text"
        />
        <i className="fe fe-search articleSearchIcon"></i>
      </form>
    </div>
  );
};

export default CenterSearch;
