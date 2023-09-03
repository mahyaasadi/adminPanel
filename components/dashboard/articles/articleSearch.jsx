const ArticleSearch = ({ articleSearchInput, setArticleSearchInput }) => {
  return (
    <div className="box col-md-3 col-12 relative">
      <form className="search">
        <label className="lblAbs font-13">جستجوی مقاله</label>
        <input
          onChange={(e) => setArticleSearchInput(e.target.value)}
          value={articleSearchInput}
          autoComplete="off"
          className="form-control rounded-sm font-12 articleSearchInput"
          placeholder="عنوان فارسی/انگلیسی مقاله ..."
          type="text"
        />
        <i className="fe fe-search articleSearchIcon"></i>
      </form>
    </div>
  );
};

export default ArticleSearch;
