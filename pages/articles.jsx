"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticlesListTable from "components/dashboard/articles/articlesListTable";
import AddArticleModal from "components/dashboard/articles/addArticleModal/addArticleModal";
// import EditArticleGroupModal from "components/dashboard/articles/articleGroups/editArticleGroupModal/editArticleGroupModal";

let ActiveArticleGrpID = null;

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesData, setArticlesData] = useState([]);
  const [editArticleData, setEditArticleData] = useState([]);
  const [newArticleDate, setNewArticleDate] = useState("");

  // Get all articles
  const getAllArticles = () => {
    let url = "/Article/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setArticlesData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const setArticleDateInDB = (newDate) => {
    setNewArticleDate(newDate);
  };

  let selectedArticleLanguage = null;
  const FUSelectArticleLanguage = (lang) => {
    selectedArticleLanguage = lang;
  };

  // Convert imageUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      // console.log(file);

      fileReader.onload = () => {
        // console.log(fileReader.result);
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        // console.log(error);
        reject(error);
      };
    });
  };

  // Add Article
  let articleImg = null;
  const addArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "Article/add";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.addArticleImg && formProps.addArticleImg.size != 0) {
      articleImg = await convertBase64(formProps.addArticleImg);
    }

    let data = {
      Title: formProps.addArticleTitle,
      EngTitle: formProps.addArticleEngName,
      Creator: formProps.addArticleAuthor,
      POT: formProps.addArticlePOT,
      Des: formProps.addArticleDes,
      Schema: formProps.addArticleSchema,
      Date: newArticleDate,
      EngArticle: formProps.addArticleLanguage,
      Image: articleImg,
      ShowInSlider: formProps.articleShowInSlider === "on" ? "1" : "0",
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setArticlesData([...articlesData, response.data]);
        setIsLoading(false);

        $("#addArticleModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Delete Article
  const deleteArticle = async (id) => {
    let result = await QuestionAlert(
      "حذف مقاله !",
      "آیا از حذف مقاله اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = `Article/delete/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setArticlesData(articlesData.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <>
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
                    data-bs-target="#addArticleModal"
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

            {/* <!-- Articles List --> */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست مقالات</h5>
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

                  <ArticlesListTable
                    data={articlesData}
                    // updateArticleGroup={updateArticleGroup}
                    deleteArticle={deleteArticle}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddArticleModal
          addArticle={addArticle}
          setArticleDateInDB={setArticleDateInDB}
          FUSelectArticleLanguage={FUSelectArticleLanguage}
        />

        {/* <EditArticleGroupModal
          data={editArticleGroupData}
          editArticleGroup={editArticleGroup}
        /> */}
      </div>
    </>
  );
};

export default Articles;
