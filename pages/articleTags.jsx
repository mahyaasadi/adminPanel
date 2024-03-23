"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticleTagsListTable from "components/dashboard/articles/articleTags/articleTagsListTable";
import ArticleTagsModal from "components/dashboard/articles/articleTags/articleTagsModal";

export const getServerSideProps = async ({ req, res }) => {
  const result = getSession(req, res);

  if (result) {
    const { UserData } = result;
    return { props: { UserData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let ActiveArticleTagID = null;
const ArticleTagsManagement = ({ UserData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleTags, setArticleTags] = useState([]);
  const [editArticleTagData, setEditArticleTagData] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  //get all states
  const getAllArticleTags = () => {
    let url = "ArticleTags/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setArticleTags(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add Tag to Article
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

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
        setArticleTags([...articleTags, response.data]);

        setIsLoading(false);
        setShowModal(false);
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
    setModalMode("edit");
    setShowModal(true);
  };

  const editArticleTag = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = `ArticleTags/update/${ActiveArticleTagID}`;
    let data = {
      Title: formProps.editArticleTagTitle,
      EngTitle: formProps.editArticleTagEngTitle,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        updateArticleTagItem(formProps.editArticleTagID, response.data);

        setShowModal(false);
        setIsLoading(false);
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

    if (result) {
      setIsLoading(true);
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

  useEffect(() => getAllArticleTags(), []);

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
                  <button
                    onClick={openAddModal}
                    className="btn btn-primary btn-add"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    افزودن
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16 text-secondary">
                          لیست تگ مقالات
                        </h5>
                      </div>
                    </div>
                  </div>

                  <ArticleTagsListTable
                    data={articleTags}
                    updateArticleTag={updateArticleTag}
                    deleteArticleTag={deleteArticleTag}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <ArticleTagsModal
          show={showModal}
          onHide={handleCloseModal}
          isLoading={isLoading}
          mode={modalMode}
          onSubmit={modalMode == "add" ? addArticleTag : editArticleTag}
          data={editArticleTagData}
        />
      </div>
    </>
  );
};

export default ArticleTagsManagement;
