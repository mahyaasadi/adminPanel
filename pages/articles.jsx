"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert, SuccessAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ArticlesListTable from "components/dashboard/articles/articlesListTable";
import ArticleSearch from "components/dashboard/articles/articleSearch";
import AddArticleModal from "components/dashboard/articles/addArticleModal";
import EditArticleModal from "components/dashboard/articles/editArticleModal";
import SubArticlesModal from "components/dashboard/articles/subArticles/subArticleModal";
import AddSubArticleModal from "components/dashboard/articles/subArticles/addSubArticleModal";
import EditSubArticleModal from "components/dashboard/articles/subArticles/editSubArticleModal";
import ArticleVideosModal from "components/dashboard/articles/articleVideos/articleVideosModal";
import AddArticleVideoModal from "components/dashboard/articles/articleVideos/addArticleVideoModal";
import EditArticleVideoModal from "components/dashboard/articles/articleVideos/editArticleVideoModal";
import GrpAttachmentList from "components/dashboard/articles/articleGrpAttachment/grpAttachmentsList";
import AddGroupToArticleModal from "components/dashboard/articles/articleGrpAttachment/addGrpToArticleModal";
import TagAttachmentList from "components/dashboard/articles/articleTagAttachment/tagAttachmentsList";
import AddTagToArticleModal from "components/dashboard/articles/articleTagAttachment/addTagToArticleModal";
import FAQListTableModal from "components/dashboard/articles/FAQ/faqListTableModal";
import AddFAQModal from "components/dashboard/articles/FAQ/addFaqModal";
import EditFAQModal from "components/dashboard/articles/FAQ/editFaqModal";
import RelatedArticlesList from "components/dashboard/articles/relatedArticles/relatedArticleList";
import AddRelatedArticleModal from "components/dashboard/articles/relatedArticles/addRelatedArticleModal";
import SubTextEditor from "components/dashboard/articles/subArticles/subTextEditor";
import ArticlesPagination from "components/dashboard/articles/articlesPagination";

let ActiveArticleID,
  ActiveSubArticleID,
  selectedArticleLanguage,
  ActiveVideoID,
  ActiveArticleTitle,
  ActiveGroupID = null;

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesData, setArticlesData] = useState([]);
  const [newArticleDate, setNewArticleDate] = useState("");
  const [editArticleData, setEditArticleData] = useState({ empty: 1 });
  const [editSubArticleData, setEditSubArticleData] = useState({ empty: 1 });
  const [editArticleVideoData, setEditArticleVideoData] = useState([]);
  const [subArticlesData, setSubArticlesData] = useState();
  const [articleVideosData, setArticleVideosData] = useState();
  // --------------
  const [selectedArticleGroups, setSelectedArticleGrp] = useState([]);
  const [articleGroupsData, setArticleGroupsData] = useState([]);
  const [articleGroupsOptionsList, setArticleGroupsOptionsList] = useState([]);

  // --------------
  const [selectedArticleTags, setSelectedArticleTags] = useState([]);
  const [articleTagsData, setArticleTagsData] = useState([]);
  const [articleTagsOptionsList, setArticleTagsOptionsList] = useState([]);

  //  -------------
  const [articleFAQData, setArticleFAQData] = useState([]);
  const [editedFAQData, setEditedFAQData] = useState([]);

  // -------------
  const [relatedArticlesData, setRelatedArticlesData] = useState([]);
  const [relatedArticlesOptions, setRelatedArticlesOptions] = useState([]);

  // -------------

  // Get all articles
  const getAllArticles = () => {
    let url = "/Article/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log("articles", response.data);
        setIsLoading(false);
        setArticlesData(response.data);

        let selectRelatedArticles = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            value: item._id,
            label: item.Title,
          };
          selectRelatedArticles.push(obj);
        }
        setRelatedArticlesOptions(selectRelatedArticles);
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

  // Pagination => User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  // Number of items to be displayed on each page
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // The first and last record on the current page
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  // Records to be displayed on the current page
  const currentItems = searchedArticles.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(searchedArticles.length / itemsPerPage);

  // Article Date
  const setArticleDateInDB = (newDate) => {
    setNewArticleDate(newDate);
  };

  // Article language
  const FUSelectArticleLanguage = (lang) => {
    selectedArticleLanguage = lang;
  };

  let sliderCheckbox = false;
  const [sliderCheckboxStatus, setSliderCheckboxStatus] = useState({
    sliderCheckbox,
  });

  let callToActionCheckbox = false;
  const [actionCheckboxStatus, setActionCheckboxStatus] = useState({
    callToActionCheckbox,
  });

  // Article showInSlider checkbox
  const handleCheckedSliderOptions = (e) => {
    const { value, checked } = e.target;
    const { sliderCheckbox } = sliderCheckboxStatus;

    console.log(`${value} is ${checked}`);

    checked
      ? // Case 1 : The user checks the box
        setSliderCheckboxStatus({ sliderCheckbox: true })
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

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.addArticleImg && formProps.addArticleImg.size != 0) {
      articleImg = await convertBase64(formProps.addArticleImg);
    }

    let url = "Article/add";
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
        setArticlesData([response.data, ...articlesData]);

        // reseting
        getAllArticles();
        e.target.reset();
        $("#addArticleImg").val("");
        $("#articleFileUploadPreview").attr("src", "");

        $("#addArticleModal").modal("hide");
        setIsLoading(false);
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

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.editArticleImg && formProps.editArticleImg.size != 0) {
      newArticleImg = await convertBase64(formProps.editArticleImg);
    }

    let url = `Article/update/${ActiveArticleID}`;
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

    index === -1
      ? console.log("no match")
      : setArticlesData([
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
          ErrorAlert("خطا", "حذف مقاله با خطا مواجه گردید!");
        });
    } else {
      // setIsLoading(false);
    }
  };

  // -------------SubArticles----------------------

  const openSubArticleModal = (data, id) => {
    setSubArticlesData(data.Sub);
    $("#subArticlesModal").modal("show");
    ActiveArticleID = id;
  };

  const openAddSubArticleModal = (id) => {
    $("#addSubArticleModal").modal("show");
    ActiveArticleID = id;
  };

  // add SubArticle
  let subArticleImg = null;
  const addSubArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.addSubArticleImg && formProps.addSubArticleImg.size != 0) {
      subArticleImg = await convertBase64(formProps.addSubArticleImg);
    }

    let url = `Article/addSubArticle/${ActiveArticleID}`;
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

        // reseting articles
        getAllArticles();
        e.target.reset();
        subArticleImg = null;
        $("#addSubArticleImg").val("");
        $("#subArticleImgPreview").attr("src", "");

        $("#addSubArticleModal").modal("hide");
        setIsLoading(false);
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
  };

  let newSubArticleImg = null;
  const editSubArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.editSubArticleImg && formProps.editSubArticleImg.size != 0) {
      newSubArticleImg = await convertBase64(formProps.editSubArticleImg);
    }

    let url = `Article/updateSubArticle/${ActiveArticleID}/${ActiveSubArticleID}`;
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

    axiosClient
      .put(url, Data)
      .then((response) => {
        console.log(response.data);
        updateSubArticleItem(formProps.editSubArticleID, response.data);

        // reset
        getAllArticles();
        e.target.reset();
        newSubArticleImg = null;
        $("#editSubArticleImg").val("");

        $("#editSubArticleModal").modal("hide");
        setIsLoading(false);
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
    // setIsLoading(true);
    let result = await QuestionAlert(
      "حذف زیر مقاله !",
      "آیا از حذف زیر مقاله اطمینان دارید؟"
    );

    if (result) {
      let url = `Article/deleteSubArticle/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setSubArticlesData(subArticlesData.filter((a) => a._id !== id));
          getAllArticles();
          // setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // setIsLoading(false);
        });
    }
  };

  // ----- change subArticle Order -----
  const updateSubDataOrder = async () => {
    setIsLoading(true);
    let result = await QuestionAlert(
      "تغییر ترتیب زیر مقالات!",
      "آیا از تغییر ترتیب زیر مقالات اطمینان دارید؟"
    );

    if (result) {
      let url = `/Article/updateSubArticleOrdre/${ActiveArticleID}`;
      let data = {
        SubData: subArticlesData,
      };

      console.log("data", data);

      axiosClient
        .put(url, data)
        .then((response) => {
          console.log("res", response.data);
          setSubArticlesData([]);
          setTimeout(() => {
            setSubArticlesData(response.data);
          }, 100);

          setIsLoading(false);
          SuccessAlert("موفق", "تغییرات با موفقیت ثبت گردید!");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          ErrorAlert("خطا", "خطا در ویرایش اطلاعات");
        });
    } else {
      setIsLoading(false);
    }
  };

  // --------- videos ----------

  const openArticleVideoModal = (data, id) => {
    setArticleVideosData(data.Videos);
    $("#articleVideosModal").modal("show");
    ActiveArticleID = id;
  };

  const openAddArticleVideoModal = () => {
    $("#addArticleVideoModal").modal("show");
  };

  // Add Article Video
  let articleVideo = null;
  const addVideoToArticle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `/Article/addVideo/${ActiveArticleID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.addVideoToArticle && formProps.addVideoToArticle.size != 0) {
      articleVideo = await convertBase64(formProps.addVideoToArticle);
    }

    let data = {
      Title: formProps.addVideoTitle,
      Video: articleVideo,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setArticleVideosData([...articleVideosData, response.data]);

        $("#addArticleVideoModal").modal("hide");
        setIsLoading(false);

        // reseting articles
        getAllArticles();
        e.target.reset();
        articleVideo = null;
        $("#ArticleVideoPreview").attr("src", "");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن ویدیو با خطا مواجه گردید!");
      });
  };

  // Delete Article Video
  const deleteArticleVideo = async (id) => {
    let result = await QuestionAlert(
      "حذف ویدیو  !",
      "آیا از حذف ویدیو اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = `Article/deleteVideo/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setArticleVideosData(articleVideosData.filter((a) => a._id !== id));
          getAllArticles();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Edit Article Video
  const updateArticleVideo = (data, id) => {
    $("#editArticleVideoModal").modal("show");
    setEditArticleVideoData(data);
    ActiveVideoID = id;
  };

  const editArticleVideo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `Article/updateVideo/${ActiveArticleID}/${ActiveVideoID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      Title: formProps.editVideoTitle,
      Name: formProps.editVideoName,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        updateArticleVideoItem(formProps.editVideoID, response.data);

        // reset
        getAllArticles();
        $("#editArticleVideoModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateArticleVideoItem = (id, newArr) => {
    let index = articleVideosData.findIndex((x) => x._id === id);
    let g = articleVideosData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setArticleVideosData([
        ...articleVideosData.slice(0, index),
        g,
        ...articleVideosData.slice(index + 1),
      ]);
  };

  // ------- articleGrps --------

  // Get All Article Groups
  const getAllArticleGroups = () => {
    let url = "ArticleGroup/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        setArticleGroupsData(response.data);

        let selectGroupsData = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            value: item._id,
            label: item.Title,
          };
          selectGroupsData.push(obj);
        }
        setArticleGroupsOptionsList(selectGroupsData);
      })
      .catch((error) => console.log(error));
  };

  const openGrpAttachmentModal = (articleTitle, id, GroupsData) => {
    $("#grpAttachmentModal").modal("show");
    ActiveArticleID = id;
    ActiveArticleTitle = articleTitle;
    setSelectedArticleGrp(GroupsData);
    // console.log(GroupsData);
  };

  const openAttachGrpModal = () => {
    $("#attachGrpModal").modal("show");
  };

  let selectedGroup = "";
  const FUSelectArticleGroup = (value) => {
    selectedGroup = value;
  };

  // add group
  const addGrpToArticle = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `/Article/addGroup/${ActiveArticleID}`;

    let data = {
      GroupID: selectedGroup,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        // setSelectedArticleGrp([...selectedGroup, response.data]);
        getAllArticles();

        response.data.msg === "گروه تکراری"
          ? ErrorAlert("خطا", "گروه اضافه شده تکراری می باشد!")
          : SuccessAlert("موفق", "افزودن گروه به مقاله با موفقیت انجام گردید!");

        $("#attachGrpModal").modal("hide");
        $("#grpAttachmentModal").modal("hide");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن گروه با خطا مواجه گردید!");
      });
  };

  // delete group
  const removeGrpFromArticle = async (id) => {
    let result = await QuestionAlert(
      "حذف  گروه از مقاله!",
      "آیا از حذف گروه اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = `Article/deleteGroup/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setSelectedArticleGrp(
            selectedArticleGroups.filter((a) => a._id !== id)
          );

          getAllArticles();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // ------ tags attachment -------
  const openTagsAttachmentModal = (articleTitle, id, TagsData) => {
    $("#tagsAttachmentModal").modal("show");
    ActiveArticleID = id;
    ActiveArticleTitle = articleTitle;
    setSelectedArticleTags(TagsData);
  };

  // Get All Article Tags
  const getAllArticleTags = () => {
    let url = "/ArticleTags/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        setArticleTagsData(response.data);
        let selectTagsData = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          let obj = {
            value: item._id,
            label: item.Title,
          };
          selectTagsData.push(obj);
        }
        setArticleTagsOptionsList(selectTagsData);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  let selectedTag = "";
  const FUSelectArticleTag = (value) => {
    selectedTag = value;
  };

  const openAttachTagModal = () => {
    $("#attachTagModal").modal("show");
  };

  const addTagToArticle = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `Article/addTag/${ActiveArticleID}`;

    let data = {
      TagID: selectedTag,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        getAllArticles();

        response.data.msg === "گروه تکراری"
          ? ErrorAlert("خطا", "گروه اضافه شده تکراری می باشد!")
          : SuccessAlert("موفق", "افزودن تگ به مقاله با موفقیت انجام گردید!");

        $("#attachTagModal").modal("hide");
        $("#tagsAttachmentModal").modal("hide");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن تگ با خطا مواجه گردید!");
      });
  };

  const removeTagFromArticle = async (id) => {
    let result = await QuestionAlert(
      "حذف  تگ از مقاله!",
      "آیا از حذف تگ اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = `Article/deleteTag/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setSelectedArticleTags(
            selectedArticleTags.filter((a) => a._id !== id)
          );

          getAllArticles();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // ------ FAQ ---------
  const openFAQModal = (articleTitle, data, articleId) => {
    $("#FAQListModal").modal("show");
    setArticleFAQData(data.FAQ);
    ActiveArticleID = articleId;
    ActiveArticleTitle = articleTitle;
  };

  const openAddFAQModal = () => {
    $("#addFAQModal").modal("show");
  };

  // Add FAQ
  const addFAQ = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = `Article/addFAQ/${ActiveArticleID}`;
    let data = {
      Qu: formProps.addFAQuestion,
      Ans: formProps.addFAQAnswer,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setArticleFAQData([...articleFAQData, response.data]);
        getAllArticles();

        $("#addFAQModal").modal("hide");
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن سوال متداول با خطا مواجه گردید!");
      });
  };

  // remove FAQ from article
  const removeFAQFromArticle = async (articleID, id) => {
    let result = await QuestionAlert(
      "حذف پرسش از مقاله!",
      "آیا از حذف پرسش اطمینان دارید؟"
    );
    setIsLoading(true);

    if (result) {
      let url = `Article/deleteFAQ/${articleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setArticleFAQData(articleFAQData.filter((a) => a._id !== id));

          getAllArticles();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  //edit FAQ
  const updateFAQ = (articleID, data) => {
    $("#editFAQModal").modal("show");
    ActiveArticleID = articleID;
    setEditedFAQData(data);
  };

  const editFAQ = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let FAQID = formProps.editFAQId;

    let url = `Article/updateFAQ/${ActiveArticleID}/${FAQID}`;
    let data = {
      Qu: formProps.editFAQuestion,
      Ans: formProps.editFAQAnswer,
    };

    console.log("data", data);

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateFAQItem(formProps.editFAQId, response.data);

        getAllArticles();
        $("#editFAQModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateFAQItem = (id, newArr) => {
    let index = articleFAQData.findIndex((x) => x._id === id);
    let g = articleFAQData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setArticleFAQData([
        ...articleFAQData.slice(0, index),
        g,
        ...articleFAQData.slice(index + 1),
      ]);
  };

  // ------ related articles -------
  const openRelatedArticlesModal = (
    articleTitle,
    articleId,
    relatedArticles
  ) => {
    $("#relatedArticlesModal").modal("show");
    ActiveArticleTitle = articleTitle;
    ActiveArticleID = articleId;
    setRelatedArticlesData(relatedArticles);
  };

  let selectedRelatedArticle = "";
  const FUSelectRelatedArticle = (value) => {
    selectedRelatedArticle = value;
  };

  // add related article
  const addRelatedArticle = (e) => {
    e.preventDefault();

    let url = `Article/addRelated/${ActiveArticleID}`;
    let data = {
      RelatedID: selectedRelatedArticle,
    };

    setIsLoading(true);

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        getAllArticles();

        $("#attachRelatedArticle").modal("hide");
        $("#relatedArticlesModal").modal("hide");
        SuccessAlert("موفق", "افزودن مقاله مرتبط با موفقیت انجام گردید!");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن مقاله مرتبط با خطا مواجه گردید!");
      });
  };

  // remove related article
  const removeRelatedArticle = async (id) => {
    let result = await QuestionAlert(
      "حذف مقاله مرتبط !",
      "آیا از حذف مقاله مرتبط اطمینان دارید؟"
    );

    setIsLoading(true);

    if (result) {
      let url = `/Article/deleteRelated/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          setRelatedArticlesData(
            relatedArticlesData.filter((a) => a._id !== id)
          );

          getAllArticles();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // subArticle Text Editor
  const openSubTextEditor = (data) => {
    $("#subTextEditorModal").modal("show");
    setEditSubArticleData(data);
  };

  useEffect(() => {
    getAllArticles();
    getAllArticleGroups();
    getAllArticleTags();
  }, []);

  return (
    <>
      <Head>
        <title>مقالات</title>
      </Head>
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
                    articlesData={currentItems}
                    updateArticle={updateArticle}
                    deleteArticle={deleteArticle}
                    openArticleVideoModal={openArticleVideoModal}
                    openSubArticleModal={openSubArticleModal}
                    openGrpAttachmentModal={openGrpAttachmentModal}
                    openTagsAttachmentModal={openTagsAttachmentModal}
                    openFAQModal={openFAQModal}
                    openRelatedArticlesModal={openRelatedArticlesModal}
                  />

                  <ArticlesPagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <AddArticleModal
          addArticle={addArticle}
          setArticleDateInDB={setArticleDateInDB}
          FUSelectArticleLanguage={FUSelectArticleLanguage}
          isLoading={isLoading}
        />
        <EditArticleModal
          data={editArticleData}
          editArticle={editArticle}
          setArticleDateInDB={setArticleDateInDB}
          FUSelectArticleLanguage={FUSelectArticleLanguage}
          handleShowInSliderCheckbox={handleShowInSliderCheckbox}
          handleCheckedSliderOptions={handleCheckedSliderOptions}
          isLoading={isLoading}
        />
        {/* subArticles */}
        <SubArticlesModal
          data={subArticlesData}
          ActiveArticleID={ActiveArticleID}
          openAddSubArticleModal={openAddSubArticleModal}
          updateSubArticle={updateSubArticle}
          deleteSubArticle={deleteSubArticle}
          updateSubDataOrder={updateSubDataOrder}
          isLoading={isLoading}
          openSubTextEditor={openSubTextEditor}
        />
        <AddSubArticleModal
          addSubArticle={addSubArticle}
          isLoading={isLoading}
        />
        <EditSubArticleModal
          data={editSubArticleData}
          editSubArticle={editSubArticle}
          handleCallToActionSwitch={handleCallToActionSwitch}
          handleCheckedCallToActionOptions={handleCheckedCallToActionOptions}
          isLoading={isLoading}
        />
        {/* videos */}
        <ArticleVideosModal
          data={articleVideosData}
          openAddArticleVideoModal={openAddArticleVideoModal}
          deleteArticleVideo={deleteArticleVideo}
          updateArticleVideo={updateArticleVideo}
        />
        <AddArticleVideoModal
          addVideoToArticle={addVideoToArticle}
          isLoading={isLoading}
        />
        <EditArticleVideoModal
          data={editArticleVideoData}
          editArticleVideo={editArticleVideo}
        />
        {/* group attachments */}
        <GrpAttachmentList
          data={selectedArticleGroups}
          articleTitle={ActiveArticleTitle}
          openAttachGrpModal={openAttachGrpModal}
          removeGrpFromArticle={removeGrpFromArticle}
        />
        <AddGroupToArticleModal
          grpOptions={articleGroupsOptionsList}
          FUSelectArticleGroup={FUSelectArticleGroup}
          addGrpToArticle={addGrpToArticle}
        />
        {/* tag attachments */}
        <TagAttachmentList
          data={selectedArticleTags}
          articleTitle={ActiveArticleTitle}
          openAttachTagModal={openAttachTagModal}
          removeTagFromArticle={removeTagFromArticle}
        />
        <AddTagToArticleModal
          tagOptions={articleTagsOptionsList}
          FUSelectArticleTag={FUSelectArticleTag}
          addTagToArticle={addTagToArticle}
        />
        {/* FAQ */}
        <FAQListTableModal
          data={articleFAQData}
          articleTitle={ActiveArticleTitle}
          openAddFAQModal={openAddFAQModal}
          removeFAQFromArticle={removeFAQFromArticle}
          ActiveArticleID={ActiveArticleID}
          updateFAQ={updateFAQ}
        />
        <AddFAQModal addFAQ={addFAQ} />
        <EditFAQModal data={editedFAQData} editFAQ={editFAQ} />
        {/* related articles */}
        <RelatedArticlesList
          data={relatedArticlesData}
          articleTitle={ActiveArticleTitle}
          ActiveArticleID={ActiveArticleID}
          removeRelatedArticle={removeRelatedArticle}
        />

        <AddRelatedArticleModal
          relatedArticleOptions={relatedArticlesOptions}
          FUSelectRelatedArticle={FUSelectRelatedArticle}
          addRelatedArticle={addRelatedArticle}
        />
        {/* sub text editor */}
        <SubTextEditor data={editSubArticleData} />
      </div>
    </>
  );
};

export default Articles;
