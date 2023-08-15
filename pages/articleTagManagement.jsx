"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticleTagsListTable from "components/dashboard/articles/articleTags/articleTagsListTable";
import AddArticleTagModal from "components/dashboard/articles/articleTags/addArticleTagModal/addArticleTagModal";

const ArticleTagsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleTags, setArticleTags] = useState([]);

  //get all states
  const getAllArticleTags = () => {
    let url = "/ArticleTags/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setArticleTags(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add Tag to Article
  const addArticleTag = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "ArticleTags/add";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      Title: formProps.articleTagTitle,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setArticleTags([...articleTags, response.data]);

        setIsLoading(false);
        $("#addArticleTagModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Delete ArticleTag
  const deleteArticleTag = async (id) => {
    let result = await QuestionAlert(
      "حذف تگ مقاله !",
      "?آیا از حذف مطمئن هستید"
    );
    setIsLoading(true);

    if (result) {
      let url = `ArticleTags/delete/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setArticleTags(articleTags.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getAllArticleTags();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addArticleTagModal"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  افزودن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Menu List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title font-16">لیست تگ مقاله ها</h5>
                    </div>
                    <div className="col-auto d-flex flex-wrap">
                      <div className="form-custom me-2">
                        <div
                          id="tableSearch"
                          className="dataTables_wrapper"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <ArticleTagsListTable
                    data={articleTags}
                    deleteArticleTag={deleteArticleTag}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddArticleTagModal addArticleTag={addArticleTag} />
      </div>
    </>
  );
};

export default ArticleTagsManagement;
