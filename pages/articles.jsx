"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { convertBase64 } from "utils/convertBase64";
import { updateItem } from "utils/updateItem";
import { QuestionAlert, ErrorAlert, SuccessAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import Paginator from "components/commonComponents/paginator";
import ArticlesListTable from "components/dashboard/articles/articlesListTable";
import ArticleSearch from "components/dashboard/articles/articleSearch";
import AddArticleModal from "components/dashboard/articles/addArticleModal";
import EditArticleModal from "components/dashboard/articles/editArticleModal";
import SubArticlesListModal from "@/components/dashboard/articles/subArticles/subArticlesListModal";
// import SubArticleModal from "@/components/dashboard/articles/subArticles/subArticleModal";
import AddSubArticleModal from "components/dashboard/articles/subArticles/addSubArticleModal";
import EditSubArticleModal from "components/dashboard/articles/subArticles/editSubArticleModal";
import ArticleVideosList from "components/dashboard/articles/articleVideos/articleVideosList";
import ArticleVideosModal from "components/dashboard/articles/articleVideos/articleVideosModal"
import GrpAttachmentList from "components/dashboard/articles/attachments/grpAttachmentsList";
import TagAttachmentList from "components/dashboard/articles/attachments/tagAttachmentsList";
import FAQListTableModal from "components/dashboard/articles/FAQ/faqListTableModal";
import ArticleFAQsModal from "components/dashboard/articles/FAQ/faqModal";
import RelatedArticlesList from "components/dashboard/articles/attachments/relatedArticleList";
import SubTextEditor from "components/dashboard/articles/subArticles/subTextEditor";
import AddEntityToArticleModal from "components/dashboard/articles/attachments/addEntityToArticleModal";

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

let ActiveArticleID,
  ActiveSubArticleID,
  ActiveVideoID,
  ActiveArticleTitle = null;

const Articles = ({ UserData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesData, setArticlesData] = useState([]);
  const [newArticleDate, setNewArticleDate] = useState("");
  const [editArticleData, setEditArticleData] = useState({ empty: 1 });
  const [editSubArticleData, setEditSubArticleData] = useState({ empty: 1 });
  const [subArticlesData, setSubArticlesData] = useState();
  // --------------
  const [articleVideosData, setArticleVideosData] = useState();
  const [editArticleVideoData, setEditArticleVideoData] = useState([]);
  // --------------
  const [selectedArticleGroups, setSelectedArticleGrp] = useState([]);
  const [articleGroupsOptionsList, setArticleGroupsOptionsList] = useState([]);
  // --------------
  const [selectedArticleTags, setSelectedArticleTags] = useState([]);
  const [articleTagsOptionsList, setArticleTagsOptionsList] = useState([]);
  //  -------------
  const [articleFAQData, setArticleFAQData] = useState([]);
  const [editedFAQData, setEditedFAQData] = useState([]);
  // -------------
  const [relatedArticlesData, setRelatedArticlesData] = useState([]);
  const [relatedArticlesOptions, setRelatedArticlesOptions] = useState([]);
  // -------------
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [entityType, setEntityType] = useState("group");

  const handleCloseEntityModal = () => setShowEntityModal(false);

  // Get All Articles
  const getAllArticles = () => {
    setIsLoading(true);

    let url = "/Article/getAll";

    axiosClient
      .get(url)
      .then((response) => {
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
        setIsLoading(false);
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentItems = searchedArticles.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(searchedArticles.length / itemsPerPage);

  // Article Date
  const setArticleDateInDB = (newDate) => setNewArticleDate(newDate);

  // Article language
  const FUSelectArticleLanguage = (lang) => (selectedArticleLanguage = lang);

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

    checked
      ? setSliderCheckboxStatus({ sliderCheckbox: true })
      : setSliderCheckboxStatus({ sliderCheckbox: false });
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
      PageTitle: formProps.addArticleHeading,
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

    axiosClient
      .post(url, data)
      .then((response) => {
        setArticlesData([response.data, ...articlesData]);

        // reset
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
      PageTitle: formProps.editArticleHeading,
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

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(
          formProps.editArticleID,
          response.data,
          articlesData,
          setArticlesData
        );
        $("#editArticleModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Article
  const deleteArticle = async (id) => {
    let result = await QuestionAlert(
      "",
      "آیا از حذف مقاله اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
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
          ErrorAlert("خطا", "حذف مقاله با خطا مواجه گردید!");
        });
    }
  };

  // -------------SubArticles------------------ //
  const openSubArticleModal = (data, id) => {
    setSubArticlesData(data.Sub);
    $("#subArticlesModal").modal("show");
    ActiveArticleID = id;
  };

  const openAddSubArticleModal = (id) => {
    $("#addSubArticleModal").modal("show");
    ActiveArticleID = id;
  };

  // Add SubArticle
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

    axiosClient
      .post(url, data)
      .then((response) => {
        setSubArticlesData([...subArticlesData, response.data]);

        // reset
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
        updateItem(
          response.data._id,
          response.data,
          subArticlesData,
          setSubArticlesData
        );

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

  // Delete SubArticle
  const deleteSubArticle = async (id) => {
    let result = await QuestionAlert(
      "",
      "آیا از حذف زیر مقاله اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
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

  // ----- change subArticle Order -----
  const updateSubDataOrder = async () => {
    let result = await QuestionAlert(
      "",
      "آیا از تغییر ترتیب زیر مقالات اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `/Article/updateSubArticleOrdre/${ActiveArticleID}`;
      let data = {
        SubData: subArticlesData,
      };

      axiosClient
        .put(url, data)
        .then((response) => {
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
    }
  };

  // --------- videos ----------
  const [videoModalMode, setVideoModalMode] = useState("add");
  const [showVideosListModal, setShowVideosListModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false);
  const closeVideosModal = () => setShowVideoModal(false);
  const closeVideosListModal = () => setShowVideosListModal(false)

  const openArticleVideoModal = (data, id) => {
    setShowVideosListModal(true)
    setArticleVideosData(data.Videos);
    ActiveArticleID = id;
  };

  const openAddArticleVideoModal = () => {
    setVideoModalMode("add");
    setShowVideoModal(true)
  }

  // Add Article Video
  const addVideoToArticle = (data) => {
    setArticleVideosData([...articleVideosData, data]);
    getAllArticles();
  };

  // Delete Article Video
  const deleteArticleVideo = async (id) => {
    let result = await QuestionAlert(
      "حذف ویدیو  !",
      "آیا از حذف ویدیو اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `Article/deleteVideo/${ActiveArticleID}/${id}`;

      await axiosClient
        .delete(url)
        .then(() => {
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
    setVideoModalMode("edit");
    setShowVideoModal(true)
    setEditArticleVideoData(data);
    ActiveVideoID = id;
  };

  const editArticleVideo = (videoID, data) => {
    updateItem(
      videoID,
      data,
      articleVideosData,
      setArticleVideosData
    );
    getAllArticles();
  };

  // ------- articleGrps --------
  const getAllArticleGroups = () => {
    let url = "ArticleGroup/getAll";

    axiosClient
      .get(url)
      .then((response) => {
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
    setEntityType("group");
    ActiveArticleID = id;
    ActiveArticleTitle = articleTitle;
    setSelectedArticleGrp(GroupsData);
  };

  const openAttachGrpModal = () => {
    setShowEntityModal(true);
    setEntityType("group");
  };

  const [selectedGroup, setSelectedGroup] = useState("");
  const FUSelectArticleGroup = (value) => setSelectedGroup(value);

  // Add group
  const addGrpToArticle = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `/Article/addGroup/${ActiveArticleID}`;
    let data = {
      GroupID: selectedGroup,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        getAllArticles();

        response.data.msg === "گروه تکراری"
          ? ErrorAlert("خطا", "گروه اضافه شده تکراری می باشد!")
          : SuccessAlert("موفق", "افزودن گروه به مقاله با موفقیت انجام گردید!");

        setShowEntityModal(false);
        $("#grpAttachmentModal").modal("hide");
        e.target.reset();
        setSelectedGroup(null);
        setIsLoading(false);
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

    if (result) {
      setIsLoading(true);
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
    setEntityType("tag");
  };

  // Get All Article Tags
  const getAllArticleTags = () => {
    let url = "/ArticleTags/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        // setArticleTagsData(response.data);

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

  const [selectedTag, setSelectedTag] = useState("");
  const FUSelectArticleTag = (value) => setSelectedTag(value);

  const openAttachTagModal = () => {
    setShowEntityModal(true);
    setEntityType("tag");
  };

  const addTagToArticle = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `Article/addTag/${ActiveArticleID}`;
    let data = {
      TagID: selectedTag,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        getAllArticles();

        response.data.msg === "گروه تکراری"
          ? ErrorAlert("خطا", "گروه اضافه شده تکراری می باشد!")
          : SuccessAlert("موفق", "افزودن تگ به مقاله با موفقیت انجام گردید!");

        setShowEntityModal(false);
        $("#tagsAttachmentModal").modal("hide");
        e.target.reset();
        setSelectedTag(null);
        setIsLoading(false);
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

    if (result) {
      setIsLoading(true);
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
  const [showFaqListModal, setShowFaqListModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqMode, setFaqMode] = useState("add");
  const closeFaqListModal = () => setShowFaqListModal(false)
  const closeFaqModal = () => setShowFaqModal(false);

  const openFAQModal = (articleTitle, data, articleId) => {
    setShowFaqListModal(true)
    setArticleFAQData(data.FAQ);
    ActiveArticleID = articleId;
    ActiveArticleTitle = articleTitle;
  };

  const openAddFAQModal = () => {
    setShowFaqModal(true);
    setFaqMode("add")
  }

  // Add FAQ
  const addFAQ = (data) => {
    setArticleFAQData([...articleFAQData, data]);
    getAllArticles();
  };

  // remove FAQ from article
  const removeFAQFromArticle = async (articleID, id) => {
    let result = await QuestionAlert(
      "حذف پرسش از مقاله!",
      "آیا از حذف پرسش اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
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

  // edit FAQ
  const updateFAQ = (articleID, data) => {
    setShowFaqModal(true);
    setFaqMode("edit")
    setEditedFAQData(data);
    ActiveArticleID = articleID;
  };

  const editFAQ = (data) => {
    updateItem(
      data._id,
      data,
      articleFAQData,
      setArticleFAQData
    );
    getAllArticles();
  };

  // ------ related articles -------
  const openRelatedArticlesModal = (
    articleTitle,
    articleId,
    relatedArticles
  ) => {
    $("#relatedArticlesModal").modal("show");
    setEntityType("related");
    ActiveArticleTitle = articleTitle;
    ActiveArticleID = articleId;
    setRelatedArticlesData(relatedArticles);
  };

  const [selectedRelatedArticle, setSelectedRelatedArticle] = useState("");
  const FUSelectRelatedArticle = (value) => setSelectedRelatedArticle(value);

  // add related article
  const openAddRelatedArticleModal = () => {
    setShowEntityModal(true);
    setEntityType("related");
  };

  const addRelatedArticle = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `Article/addRelated/${ActiveArticleID}`;
    let data = {
      RelatedID: selectedRelatedArticle,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        getAllArticles();

        setShowEntityModal(false);
        $("#relatedArticlesModal").modal("hide");
        SuccessAlert("موفق", "افزودن مقاله مرتبط با موفقیت انجام گردید!");
        e.target.reset();
        setSelectedRelatedArticle(null);
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

    if (result) {
      setIsLoading(true);
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
                  <div className="card-header border-bottom-0"></div>

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

                  <Paginator
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
        <SubArticlesListModal
          data={subArticlesData}
          ActiveArticleID={ActiveArticleID}
          openAddSubArticleModal={openAddSubArticleModal}
          updateSubArticle={updateSubArticle}
          deleteSubArticle={deleteSubArticle}
          updateSubDataOrder={updateSubDataOrder}
          isLoading={isLoading}
          openSubTextEditor={openSubTextEditor}
        />

        {/* <SubArticleModal
          show={showSubArticleModal}
          onHide={closeSubArticleModal}
          mode={subArticleModalMode}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          data={editSubArticleData}
          handleCheckedCallToActionOptions={handleCheckedCallToActionOptions}
          handleCallToActionSwitch={handleCallToActionSwitch}
          onSubmit={subArticleModalMode == "add" ? addSubArticle : editSubArticle}
          ActiveArticleID={ActiveArticleID}
          ActiveSubArticleID={ActiveSubArticleID}
          actionCheckboxStatus={actionCheckboxStatus}
        /> */}

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
        <ArticleVideosList
          show={showVideosListModal}
          onHide={closeVideosListModal}
          data={articleVideosData}
          openAddArticleVideoModal={openAddArticleVideoModal}
          deleteArticleVideo={deleteArticleVideo}
          updateArticleVideo={updateArticleVideo}
        />

        <ArticleVideosModal
          mode={videoModalMode}
          show={showVideoModal}
          onHide={closeVideosModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onSubmit={videoModalMode == "add" ? addVideoToArticle : editArticleVideo}
          data={editArticleVideoData}
          ActiveArticleID={ActiveArticleID}
          ActiveVideoID={ActiveVideoID}
        />

        {/* FAQ */}
        <FAQListTableModal
          show={showFaqListModal}
          onHide={closeFaqListModal}
          data={articleFAQData}
          articleTitle={ActiveArticleTitle}
          openAddFAQModal={openAddFAQModal}
          removeFAQFromArticle={removeFAQFromArticle}
          ActiveArticleID={ActiveArticleID}
          updateFAQ={updateFAQ}
        />

        <ArticleFAQsModal
          show={showFaqModal}
          mode={faqMode}
          onHide={closeFaqModal}
          data={editedFAQData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onSubmit={faqMode == "add" ? addFAQ : editFAQ}
          ActiveArticleID={ActiveArticleID}
        />

        {/* sub text editor */}
        <SubTextEditor data={editSubArticleData} />

        {/* attachments */}
        <AddEntityToArticleModal
          mode={entityType}
          show={showEntityModal}
          onHide={handleCloseEntityModal}
          options={
            entityType === "tag"
              ? articleTagsOptionsList
              : entityType === "group"
                ? articleGroupsOptionsList
                : relatedArticlesOptions
          }
          FUSelectEntity={
            entityType === "tag"
              ? FUSelectArticleTag
              : entityType === "group"
                ? FUSelectArticleGroup
                : FUSelectRelatedArticle
          }
          onSubmit={
            entityType === "tag"
              ? addTagToArticle
              : entityType === "group"
                ? addGrpToArticle
                : addRelatedArticle
          }
          selectedOption={
            entityType === "tag"
              ? selectedTag
              : entityType === "group"
                ? selectedGroup
                : selectedRelatedArticle
          }
        />

        <GrpAttachmentList
          data={selectedArticleGroups}
          articleTitle={ActiveArticleTitle}
          openAttachGrpModal={openAttachGrpModal}
          removeGrpFromArticle={removeGrpFromArticle}
        />

        <TagAttachmentList
          data={selectedArticleTags}
          articleTitle={ActiveArticleTitle}
          openAttachTagModal={openAttachTagModal}
          removeTagFromArticle={removeTagFromArticle}
        />

        <RelatedArticlesList
          data={relatedArticlesData}
          articleTitle={ActiveArticleTitle}
          openAddRelatedArticleModal={openAddRelatedArticleModal}
          removeRelatedArticle={removeRelatedArticle}
        />
      </div>
    </>
  );
};

export default Articles;
