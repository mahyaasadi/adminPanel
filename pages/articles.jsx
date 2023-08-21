"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticlesListTable from "components/dashboard/articles/articlesListTable";
import ArticleSearch from "components/dashboard/articles/articleSearch/articleSearch";
import AddArticleModal from "components/dashboard/articles/addArticleModal/addArticleModal";
import EditArticleModal from "components/dashboard/articles/editArticleModal/editArticleModal";
// import ArticleDetails from "components/dashboard/articles/articleDetails/articleDetails";
import SubArticlesModal from "components/dashboard/articles/subArticles/subArticleModal/subArticleModal";
import AddSubArticleModal from "components/dashboard/articles/subArticles/addSubArticleModal/addSubArticleModal";
import EditSubArticleModal from "components/dashboard/articles/subArticles/editSubArticleModal/editSubArticleModal";

let ActiveArticleID,
  ActiveSubArticleID,
  selectedArticleLanguage = null;

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesData, setArticlesData] = useState([]);
  const [newArticleDate, setNewArticleDate] = useState("");
  // const [articleDetailsData, setArticleDetailsData] = useState([]);
  const [editArticleData, setEditArticleData] = useState({ empty: 1 });
  const [subArticlesData, setSubArticlesData] = useState();
  const [editSubArticleData, setEditSubArticleData] = useState({ empty: 1 });

  let sliderCheckbox = false;
  const [sliderCheckboxStatus, setSliderCheckboxStatus] = useState({
    sliderCheckbox,
  });

  let callToActionCheckbox = false;
  const [actionCheckboxStatus, setActionCheckboxStatus] = useState({
    callToActionCheckbox,
  });

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

  // Search Articles
  const [articleSearchInput, setArticleSearchInput] = useState("");
  const searchedArticles = articlesData.filter(
    (article) =>
      article.Title.toLowerCase().includes(articleSearchInput.toLowerCase()) ||
      article.EngTitle.toLowerCase().includes(articleSearchInput.toLowerCase())
  );

  // Article Date
  const setArticleDateInDB = (newDate) => {
    setNewArticleDate(newDate);
  };

  // Article language
  const FUSelectArticleLanguage = (lang) => {
    selectedArticleLanguage = lang;
  };

  // Article showInSlider checkbox
  const handleCheckedSliderOptions = (e) => {
    const { value, checked } = e.target;
    const { sliderCheckbox } = sliderCheckboxStatus;

    console.log(`${value} is ${checked}`);

    checked
        // Case 1 : The user checks the box
      ? setSliderCheckboxStatus({ sliderCheckbox: true })
      : // Case 2  : The user unchecks the box
        setSliderCheckboxStatus({ sliderCheckbox: false });
  };

  function handleShowInSliderCheckbox(data) {
    if (data?.empty !== 1) {
      $("#editArticleSlider" + data?._id).prop("checked", false);
      data?.ShowInSlider === true
        ? ($(".showInSliderCheckbox").prop("checked", true),
          setSliderCheckboxStatus({ sliderCheckbox: true }))
        : ($(".showInSliderCheckbox").prop("checked", false),
          setSliderCheckboxStatus({ sliderCheckbox: false }));
    }
  }

  // SubArticle callToAction checkbox
  const handleCheckedCallToActionOptions = (e) => {
    const { value, checked } = e.target;
    const { callToActionCheckbox } = sliderCheckboxStatus;
    // console.log(`${value} is ${checked}`);

    checked
      ? setActionCheckboxStatus({ callToActionCheckbox: true })
      : setActionCheckboxStatus({ callToActionCheckbox: false });
  };

  function handleCallToActionSwitch(data) {
    if (data?.empty !== 1) {
      $("#editSubArticleCallToAction" + data?._id).prop("checked", false);
      data?.CalToAction === true
        ? ($(".callToActionCheckbox").prop("checked", true),
          setActionCheckboxStatus({ callToActionCheckbox: true }))
        : ($(".callToActionCheckbox").prop("checked", false),
          setActionCheckboxStatus({ callToActionCheckbox: false }));
    }
  }

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
        $("#articleFileUploadPreview").attr("src", "");
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
      ShowInSlider: sliderCheckboxStatus.sliderCheckbox,
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

  // const openArticleDetails = (data) => {
  //   setArticleDetailsData(data);
  //   $("#articleDetailsModal").modal("show");
  // };

  // -------------SubArticles----------------------

  const openSubArticleModal = (data, id) => {
    setSubArticlesData(data.Sub);
    $("#subArticlesModal").modal("show");
    ActiveArticleID = id;
  };

  let articleId = null;
  const openAddSubArticleModal = (id) => {
    $("#addSubArticleModal").modal("show");
    articleId = id;
  };

  // add SubArticle
  let subArticleImg = null;
  const addSubArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `Article/addSubArticle/${articleId}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.addSubArticleImg && formProps.addSubArticleImg.size != 0) {
      subArticleImg = await convertBase64(formProps.addSubArticleImg);
    }

    let data = {
      Title: formProps.addSubArticleTitle,
      Text: formProps.addSubArticleText,
      Des: formProps.addSubArticleDes,
      Image: subArticleImg,
      CalToAction: formProps.articleCallToAction === "on" ? true : false,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setSubArticlesData([...subArticlesData, response.data]);

        $("#addSubArticleModal").modal("hide");

        // reseting articles
        getAllArticles();
        setIsLoading(false);
        e.target.reset();
        $("#subArticleImgPreview").attr("src", "");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن زیر مقاله با خطا مواجه گردید!");
      });
  };

  // Edit SubArticle
  const updateSubArticle = (data, id) => {
    $("#editSubArticleModal").modal("show");
    setEditSubArticleData(data);
    ActiveSubArticleID = id;
    console.log("ActiveSubArticleID", ActiveSubArticleID);
  };

  let newSubArticleImg = null;
  const editSubArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `Article/updateSubArticle/${ActiveArticleID}/${ActiveSubArticleID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.editSubArticleImg && formProps.editSubArticleImg.size != 0) {
      newSubArticleImg = await convertBase64(formProps.editSubArticleImg);
    }

    let Data = {
      Title: formProps.editSubArticleTitle,
      Text: formProps.editSubArticleText,
      Des: formProps.editSubArticleDes,
      CalToAction: actionCheckboxStatus.callToActionCheckbox,
      Image: newSubArticleImg,
      Img: formProps.defaultSubArticleImg,
      ImgMed: formProps.defaultSubArticleImgMed,
      ImgThumb: formProps.defaultSubArticleImgThumb,
      WImg: formProps.defaultSubArticleWImg,
      WImgMed: formProps.defaultSubArticleWImgMed,
      WImgThumb: formProps.defaultSubArticleWImgThumb,
    };

    console.log(formProps);
    console.log("data", Data);

    axiosClient
      .put(url, Data)
      .then((response) => {
        console.log(response.data);
        updateSubArticleItem(formProps.editSubArticleID, response.data);

        getAllArticles();
        setIsLoading(false);
        $("#editSubArticleModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateSubArticleItem = (id, newArr) => {
    let index = subArticlesData.findIndex((x) => x._id === id);
    let g = subArticlesData[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setSubArticlesData([
        ...subArticlesData.slice(0, index),
        g,
        ...subArticlesData.slice(index + 1),
      ]);
  };

  // Delete SubArticle
  const deleteSubArticle = async (id) => {
    let result = await QuestionAlert(
      "حذف زیر مقاله !",
      "آیا از حذف زیر مقاله اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = `Article/deleteSubArticle/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setSubArticlesData(subArticlesData.filter((a) => a._id !== id));
          getAllArticles();
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
                <div className="col-md-12 d-flex gap-2 justify-content-end media-srvHeader">
                  <ArticleSearch
                    articleSearchInput={articleSearchInput}
                    setArticleSearchInput={setArticleSearchInput}
                  />

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
                    articlesData={searchedArticles}
                    updateArticle={updateArticle}
                    deleteArticle={deleteArticle}
                    // openArticleDetails={openArticleDetails}
                    openSubArticleModal={openSubArticleModal}
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
          FUSelectArticleLanguage={FUSelectArticleLanguage}
          handleShowInSliderCheckbox={handleShowInSliderCheckbox}
          handleCheckedSliderOptions={handleCheckedSliderOptions}
        />

        {/* <ArticleDetails
          data={articleDetailsData}
          openSubArticleModal={openSubArticleModal}
        /> */}

        <SubArticlesModal
          data={subArticlesData}
          ActiveArticleID={ActiveArticleID}
          openAddSubArticleModal={openAddSubArticleModal}
          updateSubArticle={updateSubArticle}
          deleteSubArticle={deleteSubArticle}
        />

        <AddSubArticleModal addSubArticle={addSubArticle} />

        <EditSubArticleModal
          data={editSubArticleData}
          editSubArticle={editSubArticle}
          handleCallToActionSwitch={handleCallToActionSwitch}
          handleCheckedCallToActionOptions={handleCheckedCallToActionOptions}
        />
      </div>
    </>
  );
};

export default Articles;
