import Link from "next/link";
import FeatherIcon from "feather-icons-react";
// import { useEffect } from "react";

const ArticlesListTable = ({
  articlesData,
  updateArticle,
  deleteArticle,
  openArticleDetails,
}) => {

  // const handleToggleInfoBox = () => {
  //   $("#infoContainer").show("");
  // }

  // useEffect(() => {
  //   $("#infoContainer").hide("")
  // }, []);

  return (
    <>
      <div className="row p-4">
        {articlesData.map((articleData, index) => (
          <div className="col-sm-6 col-md-4 col-xl-3 articleCard" key={index}>
            {/* cardImage */}
            <div className="card">
              <div className="card-body">
                <div className="articleImgContainer">
                  <img
                    className="w-100 h-50 rounded-md articleImg"
                    src={"https://irannobat.ir/blog/images/" + articleData.Img}
                    alt="articleImg"
                  ></img>

                  <div className="articleLink">
                    <div className="">مشاهده مقاله</div>
                  </div>
                </div>

                {/* cardDetails */}
                <div className="px-4">
                  <p className="py-1 font-16 mt-2 fw-bold">
                    {articleData.EngTitle}
                  </p>
                  <div className="pb-2 font-12 text-secondary">
                    نویسنده : {articleData.Creator}
                  </div>
                  <div className="pb-4 font-12 text-secondary">
                    مدت زمان مطالعه : {articleData.POT} دقیقه
                  </div>
                </div>

                <hr />

                {/* <button onClick={handleToggleInfoBox}>
                  <FeatherIcon icon="more-vetical" />
                </button> */}
                <div className="d-flex justify-flex-end gap-1" id="infoContainer">
                  <button
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="جزئیات"
                    className="btn btn-sm btn-outline-primary font-12"
                    onClick={() => openArticleDetails(articleData)}
                  >
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="info"
                    />
                  </button>
                  <button
                    button="button"
                    className="btn btn-sm btn-outline-secondary btn-border-left"
                    onClick={() => updateArticle(articleData, articleData._id)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="ویرایش"
                  >
                    <FeatherIcon
                      style={{ width: "14px", height: "14px" }}
                      icon="edit-3"
                    />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="حذف"
                    onClick={() => deleteArticle(articleData._id)}
                  >
                    <FeatherIcon
                      style={{ width: "14px", height: "14px" }}
                      icon="trash-2"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArticlesListTable;
