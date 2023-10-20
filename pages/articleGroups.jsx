"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticleGroupsModal from "components/dashboard/articles/articleGroups/articleGroupsModal"
import ArticleGroupsListTable from "components/dashboard/articles/articleGroups/articleGroupsListTable";

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

let ActiveArticleGrpID = null;
const ArticleGroupsManagement = ({ UserData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleGroupsData, setArticleGroupsData] = useState([]);
  const [editArticleGroupData, setEditArticleGroupData] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // Get all
  const getAllArticleGroups = () => {
    setIsLoading(true);
    let url = "/ArticleGroup/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        setArticleGroupsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add Article Group
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true)
  }

  const addArticleGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "ArticleGroup/add";
    let data = {
      Title: formProps.articleGroupTitle,
      EngTitle: formProps.articleGroupEngTitle,
      Des: formProps.articleGroupDescription,
    };

    console.log(data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setArticleGroupsData([...articleGroupsData, response.data]);

        setShowModal(false)
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Edit Article Group
  const updateArticleGroup = (data, articleGrpId) => {
    setEditArticleGroupData(data);
    ActiveArticleGrpID = articleGrpId;
    setShowModal(true);
    setModalMode("edit")
  };

  const editArticleGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = `ArticleGroup/update/${ActiveArticleGrpID}`;
    let data = {
      Title: formProps.editArticleGrpTitle,
      EngTitle: formProps.editArticleGrpEngTitle,
      Des: formProps.editArticleGrpDes,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateArticleGroupItem(formProps.editArticleGrpID, response.data);

        setShowModal(false)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateArticleGroupItem = (id, newArr) => {
    let index = articleGroupsData.findIndex((x) => x._id === id);
    let g = articleGroupsData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setArticleGroupsData([
        ...articleGroupsData.slice(0, index),
        g,
        ...articleGroupsData.slice(index + 1),
      ]);
  };

  // Importance State
  const ChangeImportanceState = (id, type) => {
    let findArticleGroup = articleGroupsData.find((x) => x._id === id);
    findArticleGroup.Important = type;
    let findIndex = articleGroupsData.findIndex((x) => x._id === id);
    articleGroupsData[findIndex] = findArticleGroup;
    console.log(findArticleGroup);
    setArticleGroupsData(articleGroupsData);
  };

  // Important
  const checkImportantArticle = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت اهمیت مقاله!",
      "آیا از ثبت وضیت مقاله به با اهمیت اطمینان دارید؟"
    );

    if (result) {
      let url = `ArticleGroup/setImportant/${id}`;
      setIsLoading(true);

      await axiosClient
        .put(url)
        .then((response) => {
          console.log(response.data);
          ChangeImportanceState(id, true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Unimportant
  const checkUnimportantArticle = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت اهمیت مقاله!",
      "آیا از ثبت وضعیت مقاله به بدون اهمیت اطمینان دارید؟"
    );

    if (result) {
      let url = `/ArticleGroup/removeImportant/${id}`;
      setIsLoading(true);

      await axiosClient
        .put(url)
        .then((response) => {
          console.log(response.data);
          ChangeImportanceState(id, false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Delete ArticleGroup
  const deleteArticleGroup = async (id) => {
    let result = await QuestionAlert(
      "حذف گروه مقاله !",
      "آیا از حذف گروه مقاله اطمینان دارید؟"
    );

    if (result) {
      let url = `ArticleGroup/delete/${id}`;
      setIsLoading(true);

      await axiosClient
        .delete(url)
        .then((response) => {
          setArticleGroupsData(articleGroupsData.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => getAllArticleGroups(), []);

  return (
    <>
      <Head>
        <title>گروه مقالات</title>
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
                        <h5 className="card-title font-16">لیست گروه مقالات</h5>
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

                  <ArticleGroupsListTable
                    data={articleGroupsData}
                    updateArticleGroup={updateArticleGroup}
                    deleteArticleGroup={deleteArticleGroup}
                    checkImportantArticle={checkImportantArticle}
                    checkUnimportantArticle={checkUnimportantArticle}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <ArticleGroupsModal
          show={showModal}
          onHide={handleCloseModal}
          isLoading={isLoading}
          mode={modalMode}
          onSubmit={modalMode == "add" ? addArticleGroup : editArticleGroup}
          data={editArticleGroupData}
        />
      </div>
    </>
  );
};

export default ArticleGroupsManagement;