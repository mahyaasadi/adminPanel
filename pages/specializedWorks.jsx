import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import SpeWorksModal from "components/dashboard/specializedWorks/speWorksModal";
import SpecializedWorksListTable from "components/dashboard/specializedWorks/specializedWorksListTable";

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

let CenterID = null;
const SpecializedWorks = ({ UserData }) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [speWorks, setSpeWorks] = useState([]);
  const [editSpeWorkData, setEditSpeWorkData] = useState({});
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);
  const [hiddenData, setHiddenData] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  // get specializedWorks list
  const getSpecializedWorks = () => {
    CenterID = Router.query.id;
    let url = `CenterProfile/getCenterSpecializedWorks/${CenterID}`;
    setIsLoading(true);

    if (CenterID) {
      axiosClient
        .get(url)
        .then(function (response) {
          setSpeWorks(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Add SpeWork
  const openAddModal = () => {
    setShowModal(true);
    setModalMode("add")
  };

  const addSpeWork = (e) => {
    e.preventDefault();
    setIsLoading(true);

    CenterID = Router.query.id;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/AddSpecializedWorks";
    let data = {
      CenterID: CenterID,
      Name: formProps.AddSpeName,
      Title: formProps.AddSpeTitle,
      EngName: formProps.AddSpeEngName,
    };

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          console.log(response.data);
          setSpeWorks([...speWorks, response.data]);
          setShowModal(false)
          setIsLoading(false);
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Edit SpeWorks
  const editSpeWorks = (e) => {
    e.preventDefault();
    setIsLoading(true)

    CenterID = Router.query.id;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/UpdateSpecializedWorks";
    let Data = {
      CenterID: CenterID,
      SpecializedWorksID: formProps.EditSpeWorkID,
      Name: formProps.EditSpeWorkName,
      Title: formProps.EditSpeWorkTitle,
      EngName: formProps.EditSpeWorkEngName,
    };

    if (CenterID) {
      axiosClient
        .put(url, Data)
        .then((response) => {
          updateItem(formProps.EditSpeWorkID, response.data);
          setShowModal(false)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
          setIsLoading(false)
        });
    }
  };

  const updateItem = (id, newArr) => {
    let index = speWorks.findIndex((x) => x._id === id);
    let g = speWorks[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setSpeWorks([
        ...speWorks.slice(0, index),
        g,
        ...speWorks.slice(index + 1),
      ]);
  };

  const updateSpeWork = (data) => {
    setEditSpeWorkData(data);
    setModalMode("edit");
    setShowModal(true)
  };

  // Delete SpeWork
  const deleteSpeWork = async (id) => {
    let result = await QuestionAlert(
      "حذف کار تخصصی !",
      "آیا از حذف کار تخصصی مطمئن هستید"
    );

    if (result) {
      CenterID = Router.query.id;
      let url = "CenterProfile/DeleteSpecializedWorks";
      let data = {
        CenterID: CenterID,
        SpecializedWorksID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then(function (response) {
          setSpeWorks(speWorks.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (Router.isReady) {
      CenterID = Router.query.id;

      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));
      if (hiddenData) localStorage.removeItem("hiddenData");

      getSpecializedWorks();
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>کارهای تخصصی مرکز</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  onClick={openAddModal}
                  className="btn btn-primary btn-add font-14"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </button>
              </div>
            </div>
          </div>

          {/* <!-- SpeWorks List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <p className="card-title font-14 text-secondary">
                        لیست کارهای تخصصی {hiddenData?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <SpecializedWorksListTable
                    data={speWorks}
                    deleteSpeWork={deleteSpeWork}
                    updateSpeWork={updateSpeWork}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <SpeWorksModal
          isLoading={isLoading}
          mode={modalMode}
          onHide={handleCloseModal}
          show={showModal}
          onSubmit={modalMode == "edit" ? editSpeWorks : addSpeWork}
          data={editSpeWorkData}
        />
      </div>
    </>
  );
};

export default SpecializedWorks;