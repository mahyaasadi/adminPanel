"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticleGroupsListTable from "components/dashboard/articles/articleGroups/articleGroupsListTable";
import AddArticleGroupModal from "components/dashboard/articles/articleGroups/addArticleGroupModal/addArticleGroupModal";

const ArticleGroupsManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleGroupsData, setArticleGroupsData] = useState([]);

  //get all states
  const getAllArticleGroups = () => {
    let url = "/ArticleGroup/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setArticleGroupsData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Add Article Group
  const addArticelGroup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "ArticleGroup/add";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      Title: formProps.articleGroupTitle,
      Des: formProps.articleGroupDescription,
    };

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

  // Delete ArticleGroup
  const deleteArticleGroup = async (id) => {
    let result = await QuestionAlert(
      "حذف گروه مقاله !",
      "?آیا از حذف مطمئن هستید"
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
      <div className="page-wrapper">
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
                      <h5 className="card-title font-16">لیست گروه مقاله ها</h5>
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
                  <ArticleGroupsListTable
                    data={articleGroupsData}
                    deleteArticleGroup={deleteArticleGroup}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddArticleGroupModal addArticelGroup={addArticelGroup} />
      </div>
    </>
  );
};

export default ArticleGroupsManagement;
