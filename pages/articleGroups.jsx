"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticleGroupsListTable from "components/dashboard/articles/articleGroups/articleGroupsListTable";
import AddArticleGroupModal from "components/dashboard/articles/articleGroups/addArticleGroupModal";
import EditArticleGroupModal from "components/dashboard/articles/articleGroups/editArticleGroupModal";

let ActiveArticleGrpID = null;

const ArticleGroupsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleGroupsData, setArticleGroupsData] = useState([]);
  const [editArticleGroupData, setEditArticleGroupData] = useState([]);

  // Get all
  const getAllArticleGroups = () => {
    let url = "/ArticleGroup/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setIsLoading(false);
        setArticleGroupsData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add Article Group
  const addArticleGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "ArticleGroup/add";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

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
        setIsLoading(false);

        $("#addArticleGroupModal").modal("hide");
        e.target.reset();
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
    $("#editArticleGroupModal").modal("show");
  };

  const editArticleGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `ArticleGroup/update/${ActiveArticleGrpID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

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

        setIsLoading(false);
        $("#editArticleGroupModal").modal("hide");
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
      // handle error
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
    setIsLoading(true);

    if (result) {
      let url = `ArticleGroup/delete/${id}`;

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

  useEffect(() => {
    getAllArticleGroups();
  }, []);

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
                  <Link
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#addArticleGroupModal"
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
        <AddArticleGroupModal addArticleGroup={addArticleGroup} />

        <EditArticleGroupModal
          data={editArticleGroupData}
          editArticleGroup={editArticleGroup}
        />
      </div>
    </>
  );
};

export default ArticleGroupsManagement;
