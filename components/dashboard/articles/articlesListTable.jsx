import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const ArticlesListTable = ({
  articlesData,
  updateArticle,
  deleteArticle,
  openSubArticleModal,
  openArticleVideoModal,
  openGrpAttachmentModal,
  openTagsAttachmentModal,
  openFAQModal,
  openRelatedArticlesModal,
}) => {
  console.log({ articlesData });

  return (
    <>
      <div className="row p-4">
        {articlesData.map((articleData, index) => (
          <div className="col-sm-6 col-lg-4 col-xxl-3 articleCard" key={index}>
            <div className="card">
              <div className="card-body">
                <div className="articleImgContainer">
                  <img
                    className="w-100 rounded-md articleImg"
                    src={"https://irannobat.ir/blog/images/" + articleData.Img}
                    alt="articleImg"
                  ></img>

                  <div className="articleLink">
                    <Link
                      href={
                        "https://irannobat.ir/blog/" +
                        // articleData.EngTitle.replaceAll(/ /g, "-")
                        articleData.EngTitle.replace(/ /g, "-")
                      }
                    >
                      مشاهده مقاله
                    </Link>
                  </div>
                </div>

                {/* cardDetails */}
                <div className="px-4 height-11">
                  <p className="py-1 font-15 mt-2 fw-bold">
                    {articleData.Title.substr(0, 35) + " ..."}
                  </p>
                  <div className="pb-2 font-12 text-secondary">
                    عنوان انگلیسی :{" "}
                    {articleData.EngTitle.substr(0, 20) + " ..."}
                  </div>
                  <div className="pb-2 font-12 text-secondary">
                    نویسنده : {articleData.Creator.substr(0, 10) + " ..."}
                  </div>
                  <div className="pb-4 font-12 text-secondary">
                    مدت زمان مطالعه : {articleData.POT} دقیقه
                  </div>
                </div>

                <hr />

                <div
                  className="d-flex justify-flex-end gap-1 flex-wrap"
                  id="infoContainer"
                >
                  <button
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="زیر مقاله ها"
                    className="padding-sm btn btn-sm btn-outline-primary font-12"
                    onClick={() =>
                      openSubArticleModal(articleData, articleData._id)
                    }
                  >
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="layers"
                    />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="گروه مقاله ها"
                    className="padding-sm btn btn-sm btn-outline-primary font-12"
                    onClick={() =>
                      openGrpAttachmentModal(
                        articleData.EngTitle,
                        articleData._id,
                        articleData.Groups
                      )
                    }
                  >
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="folder-plus"
                    />
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="تگ مقاله ها"
                    className="padding-sm btn btn-sm btn-outline-primary font-12"
                    onClick={() =>
                      openTagsAttachmentModal(
                        articleData.EngTitle,
                        articleData._id,
                        articleData.Tags
                      )
                    }
                  >
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="tag"
                    />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="ویدیوها"
                    className="padding-sm btn btn-sm btn-outline-primary font-12"
                    onClick={() =>
                      openArticleVideoModal(articleData, articleData._id)
                    }
                  >
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="video"
                    />
                  </button>

                  <button
                    href="#"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="مقاله های مرتبط"
                    className="padding-sm btn btn-sm btn-outline-primary font-12"
                    onClick={() =>
                      openRelatedArticlesModal(
                        articleData.EngTitle,
                        articleData._id,
                        articleData.RelatedArticles
                      )
                    }
                  >
                    <FeatherIcon
                      style={{ width: "16px", height: "16px" }}
                      icon="file-plus"
                    />
                  </button>

                  <button
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="سوالات متداول"
                    className="padding-sm btn btn-sm btn-outline-primary font-12"
                    onClick={() =>
                      openFAQModal(
                        articleData.EngTitle,
                        articleData,
                        articleData._id
                      )
                    }
                  >
                    <FeatherIcon
                      style={{ width: "16px", height: "16px" }}
                      icon="help-circle"
                    />
                  </button>

                  <button
                    button="button"
                    className="padding-sm btn btn-sm btn-outline-secondary btn-border-left"
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
                    className="padding-sm btn btn-sm btn-outline-danger"
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
