import ArticleItem from "components/dashboard/articles/articleItem/articleItem";

const ArticlesListTable = ({ articlesData, updateArticle, deleteArticle }) => {
  return (
    <>
      <div className="row p-4">
        {articlesData?.map((articleData, index) => (
          <ArticleItem
            key={index}
            data={articleData}
            updateArticle={updateArticle}
            deleteArticle={deleteArticle}
          />
        ))}
      </div>
    </>
  );
};

export default ArticlesListTable;

//   // const dateFormat = (str) => {
//   //   if (str !== "" || str !== null) {
//   //     let date =
//   //       str.substr(0, 4) + "/" + str.substr(4, 1) + "/" + str.substr(5, 6);
//   //     return date;
//   //   } else {
//   //     return 0;
//   //   }
//   // };
