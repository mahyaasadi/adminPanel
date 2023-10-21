const RefDocsSearch = ({ getRefDocsData, searchRefDocs }) => {
  const changeValue = (e) => {
    if (e.key === "Enter") {
      searchRefDocs(e.target.value);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (!inputValue.trim()) {
      // reset data
      getRefDocsData();
    }
  };

  return (
    <div className="box col-md-3 col-12 relative">
      <div className="search">
        <label className="lblAbs font-12">جستجوی پزشک</label>
        <input
          onKeyUp={changeValue}
          onChange={handleInputChange}
          autoComplete="off"
          className="form-control rounded-sm font-11 articleSearchInput"
          placeholder="نام پزشک / شماره نظام پزشکی ..."
          type="text"
        />
        <i className="fe fe-search articleSearchIcon"></i>
      </div>
    </div>
  );
};

export default RefDocsSearch;
