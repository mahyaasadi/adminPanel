"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticlesListTable from "components/dashboard/articles/articlesListTable";
import AddArticleModal from "components/dashboard/articles/addArticleModal/addArticleModal";
import EditArticleModal from "components/dashboard/articles/editArticleModal/editArticleModal";
import ArticleDetails from "components/dashboard/articles/articleDetails/articleDetails";

let ActiveArticleID,
  selectedArticleLanguage = null;

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesData, setArticlesData] = useState([]);
  const [editArticleData, setEditArticleData] = useState([]);
  const [newArticleDate, setNewArticleDate] = useState("");
  const [articleDetailsData, setArticleDetailsData] = useState([]);

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

  const FUSelectArticleLanguage = (lang) => {
    selectedArticleLanguage = lang;
  };

  // Convert imageUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
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
      EngArticle: formProps.addArticleLanguage,
      ShowInSlider: formProps.articleShowInSlider === "on" ? "1" : "0",
      Date: newArticleDate,
      Image: articleImg,
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

  // Edit Article
  const updateArticle = (data, articleId) => {
    setEditArticleData(data);
    ActiveArticleID = articleId;
    $("#editArticleModal").modal("show");
  };

  const editArticle = (e) => {
    e.preventDefault();

    let url = `Article/update/${ActiveArticleID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let Data = {
      Title: formProps.editArticleTitle,
      EngTitle: formProps.editArticleEngName,
      Creator: formProps.editArticleAuthor,
      POT: formProps.editArticlePOT,
      Des: formProps.editArticleDes,
      Schema: formProps.editArticleSchema,
      EngArticle: formProps.editArticleLanguage,
      ShowInSlider: formProps.editArticleShowInSlider === "on" ? "1" : "0",
      Date: newArticleDate,
      // Image: articleImg,
    };

    // if (CenterID) {
    axiosClient
      .put(url, Data)
      .then((response) => {
        updateArticleItem(formProps.editArticleID, response.data);
        // $("#editPhysicianModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  const updateArticleItem = (id, newArr) => {
    let index = articlesData.findIndex((x) => x._id === id);
    let g = articlesData[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setArticlesData([
        ...articlesData.slice(0, index),
        g,
        ...articlesData.slice(index + 1),
      ]);
  };

  // Delete Article
  const deleteArticle = async (id) => {
    let result = await QuestionAlert(
      "حذف مقاله !",
      "آیا از حذف مقاله اطمینان دارید؟"
    );
    // setIsLoading(true);

    if (result) {
      let url = `Article/delete/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setArticlesData(articlesData.filter((a) => a._id !== id));
          // setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setIsLoading(false);
        });
    }
  };

  const openArticleDetails = (data) => {
    setArticleDetailsData(data);
    $("#articleDetailsModal").modal("show")
  }

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
                    افزودن مقاله
                  </Link>
                </div>
              </div>
            </div>

            {/* <!-- Articles List --> */}
            <div className="row">
              <div className="">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
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
                    articlesData={articlesData}
                    updateArticle={updateArticle}
                    deleteArticle={deleteArticle}
                    openArticleDetails={openArticleDetails}
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

        <EditArticleModal
          data={editArticleData}
          editArticle={editArticle}
          setArticleDateInDB={setArticleDateInDB}
        />

        <ArticleDetails data={articleDetailsData} />
      </div>
    </>
  );
};

export default Articles;
