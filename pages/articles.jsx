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
import GetPng from "/class/webp2png.js";
import { convertToFa } from "react-calendar-datetime-picker";

let ActiveArticleID,
  selectedArticleLanguage = null;

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesData, setArticlesData] = useState([]);
  const [newArticleDate, setNewArticleDate] = useState("");
  const [articleDetailsData, setArticleDetailsData] = useState([]);
  const [editArticleData, setEditArticleData] = useState({ empty: 1 });

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

  // Article Date
  const setArticleDateInDB = (newDate) => {
    setNewArticleDate(newDate);
  };

  // Article language
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

  const [showInSliderStatus, setShowInSliderStatus] = useState({
    showInSliderOptions: [],
  });

  // showInSlider Checkbox
  const handleCheckedShowInSlider = (e) => {
    const { value, checked } = e.target;
    const { showInSliderOptions } = showInSliderStatus;

    console.log(`${value} is ${checked}`);
    // Case 1 : The user checks the box
    if (checked) {
      setShowInSliderStatus({
        setShowInSliderOptions: [...showInSliderOptions, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setShowInSliderStatus({
        setShowInSliderOptions: showInSliderOptions.filter((e) => e !== value),
      });
    }

    console.log(showInSliderStatus)
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
      console.log(articleImg);
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
    console.log("clicked outside");

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setArticlesData([...articlesData, response.data]);
        console.log("clicked inside");
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

  let newArticleImg = null;
  const editArticle = async (e) => {
    e.preventDefault();

    let url = `Article/update/${ActiveArticleID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.editArticleImg && formProps.editArticleImg.size != 0) {
      newArticleImg = await convertBase64(formProps.editArticleImg);
    }

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
      Image: newArticleImg,
    };

    console.log("data", Data);

    axiosClient
      .put(url, Data)
      .then((response) => {
        console.log(response.data);
        updateArticleItem(formProps.editArticleID, response.data);
        $("#editArticleModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleShowInSliderCheckbox(data) {
    if (data?.empty !== 1) {
      data === true
        ? $(".showInSliderCheckbox").prop("checked", true)
        : $(".showInSliderCheckbox").prop("checked", false);
    }
  }

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
    } else {
      setIsLoading(false);
    }
  };

  const openArticleDetails = (data) => {
    setArticleDetailsData(data);
    $("#articleDetailsModal").modal("show");
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
          handleCheckedShowInSlider={handleCheckedShowInSlider}
        />

        <EditArticleModal
          data={editArticleData}
          editArticle={editArticle}
          setArticleDateInDB={setArticleDateInDB}
          handleShowInSliderCheckbox={handleShowInSliderCheckbox}
          FUSelectArticleLanguage={FUSelectArticleLanguage}
          handleCheckedShowInSlider={handleCheckedShowInSlider}
        />

        <ArticleDetails data={articleDetailsData} />
      </div>
    </>
  );
};

export default Articles;
