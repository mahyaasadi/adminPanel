import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { Tooltip } from "primereact/tooltip";

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
  return (
    <>
      <div className="row p-4">
        {articlesData.map((articleData, index) => (
          <div className="col-sm-6 col-lg-4 col-xxl-3" key={index}>
            <div className="card articleCard">
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
                        articleData.EngTitle.replace(/ /g, "-")
                      }
                      target="_blank"
                    >
                      مشاهده مقاله
                    </Link>
                  </div>
                </div>

                {/* cardDetails */}
                <div className="px-4 height-11">
                  <p className="py-1 font-15 mt-2 fw-bold">
                    {articleData.Title.length > 35 ? (articleData.Title.substr(0, 35) + " ...") : articleData.Title}
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
                    data-pr-position="right"
                    className="padding-sm btn btn-sm btn-outline-primary font-12 subArticle d-flex align-items-center"
                    onClick={() =>
                      openSubArticleModal(articleData, articleData._id)
                    }
                  >
                    <Tooltip target=".subArticle">زیر مقاله ها</Tooltip>
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="layers"
                    />
                  </button>

                  <button
                    type="button"
                    data-pr-position="top"
                    className="padding-sm btn btn-sm btn-outline-primary font-12 articleGrp d-flex align-items-center"
                    onClick={() =>
                      openGrpAttachmentModal(
                        articleData.EngTitle,
                        articleData._id,
                        articleData.Groups
                      )
                    }
                  >
                    <Tooltip target=".articleGrp">گروه مقاله ها</Tooltip>
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="folder-plus"
                    />
                  </button>
                  <button
                    type="button"
                    data-pr-position="top"
                    className="padding-sm btn btn-sm btn-outline-primary font-12 articleTag d-flex align-items-center"
                    onClick={() =>
                      openTagsAttachmentModal(
                        articleData.EngTitle,
                        articleData._id,
                        articleData.Tags
                      )
                    }
                  >
                    <Tooltip target=".articleTag">تگ مقاله ها</Tooltip>
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="tag"
                    />
                  </button>

                  <button
                    type="button"
                    data-pr-position="top"
                    className="padding-sm btn btn-sm btn-outline-primary font-12 articleVids d-flex align-items-center"
                    onClick={() =>
                      openArticleVideoModal(articleData, articleData._id)
                    }
                  >
                    <Tooltip target=".articleVids">ویدیوها</Tooltip>
                    <FeatherIcon
                      style={{ width: "15px", height: "15px" }}
                      icon="video"
                    />
                  </button>

                  <button
                    type="button"
                    data-pr-position="top"
                    className="padding-sm btn btn-sm btn-outline-primary font-12 relatedArticles d-flex align-items-center"
                    onClick={() =>
                      openRelatedArticlesModal(
                        articleData.EngTitle,
                        articleData._id,
                        articleData.RelatedArticles
                      )
                    }
                  >
                    <Tooltip target=".relatedArticles">مقاله های مرتبط</Tooltip>
                    <FeatherIcon
                      style={{ width: "16px", height: "16px" }}
                      icon="file-plus"
                    />
                  </button>

                  <button
                    type="button"
                    data-pr-position="top"
                    className="padding-sm btn btn-sm btn-outline-primary font-12 faq d-flex align-items-center"
                    onClick={() =>
                      openFAQModal(
                        articleData.EngTitle,
                        articleData,
                        articleData._id
                      )
                    }
                  >
                    <Tooltip target=".faq">سوالات متداول</Tooltip>
                    <FeatherIcon
                      style={{ width: "16px", height: "16px" }}
                      icon="help-circle"
                    />
                  </button>

                  <button
                    button="button"
                    className="padding-sm btn btn-sm btn-outline-secondary btn-border-left editArticle d-flex align-items-center"
                    onClick={() => updateArticle(articleData, articleData._id)}
                    data-pr-position="top"
                  >
                    <Tooltip target=".editArticle">ویرایش</Tooltip>
                    <FeatherIcon
                      style={{ width: "14px", height: "14px" }}
                      icon="edit-2"
                    />
                  </button>
                  <button
                    type="button"
                    className="padding-sm btn btn-sm btn-outline-danger deleteArticle d-flex align-items-center"
                    data-pr-position="left"
                    onClick={() => deleteArticle(articleData._id)}
                  >
                    <Tooltip target=".deleteArticle">حذف</Tooltip>
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
