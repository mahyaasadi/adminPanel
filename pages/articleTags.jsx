"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticleTagsListTable from "components/dashboard/articles/articleTags/articleTagsListTable";
import AddArticleTagModal from "components/dashboard/articles/articleTags/addArticleTagModal";
import EditArticleTagModal from "components/dashboard/articles/articleTags/editArticleTagModal";

let ActiveArticleTagID = null;

const ArticleTagsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleTags, setArticleTags] = useState([]);
  const [editArticleTagData, setEditArticleTagData] = useState([]);

  //get all states
  const getAllArticleTags = () => {
    let url = "/ArticleTags/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
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
      EngTitle: formProps.articleTagEngTitle,
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

  // Edit Article Tag
  const updateArticleTag = (data, articleTagId) => {
    setEditArticleTagData(data);
    ActiveArticleTagID = articleTagId;
    $("#editArticleTagModal").modal("show");
  };

  const editArticleGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `ArticleTags/update/${ActiveArticleTagID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      Title: formProps.editArticleTagTitle,
      EngTitle: formProps.editArticleTagEngTitle,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateArticleTagItem(formProps.editArticleTagID, response.data);

        setIsLoading(false);
        $("#editArticleTagModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateArticleTagItem = (id, newArr) => {
    let index = articleTags.findIndex((x) => x._id === id);

    let g = articleTags[index];
    g = newArr;
    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setArticleTags([
        ...articleTags.slice(0, index),
        g,
        ...articleTags.slice(index + 1),
      ]);
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
      <Head>
        <title>تگ مقالات</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
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

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست تگ مقالات</h5>
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

                  <ArticleTagsListTable
                    data={articleTags}
                    updateArticleTag={updateArticleTag}
                    deleteArticleTag={deleteArticleTag}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}
        <AddArticleTagModal addArticleTag={addArticleTag} />

        <EditArticleTagModal
          data={editArticleTagData}
          editArticleGroup={editArticleGroup}
        />
      </div>
    </>
  );
};

export default ArticleTagsManagement;
