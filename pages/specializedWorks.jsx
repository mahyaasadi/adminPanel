import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { useRouter } from "next/router";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import SpecializedWorksListTable from "components/dashboard/specializedWorks/specializedWorksListTable";
import AddSpeWorkModal from "components/dashboard/specializedWorks/addspeWorkModal";
import EditSpeWorkModal from "components/dashboard/specializedWorks/editSpeWorkModal";

let CenterID = null;

const SpecializedWorks = () => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [speWorks, setSpeWorks] = useState([]);
  const [editSpeWork, setEditSpeWork] = useState({});

  //get specializedWorks list
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

    console.log("data", data);

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          console.log(response.data);
          setSpeWorks([...speWorks, response.data]);
          $("#addSpeWorkModal").modal("hide");
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

    let url = "CenterProfile/UpdateSpecializedWorks";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    CenterID = Router.query.id;

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
          $("#editSpeWorkModal").modal("hide");
          reset();
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
        });
    }
  };

  const updateItem = (id, newArr) => {
    let index = speWorks.findIndex((x) => x._id === id);
    let g = speWorks[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setSpeWorks([
        ...speWorks.slice(0, index),
        g,
        ...speWorks.slice(index + 1),
      ]);
  };

  const updateSpeWork = (data) => {
    setEditSpeWork(data);
    $("#editSpeWorkModal").modal("show");
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
      getSpecializedWorks();
      if (!CenterID) return null;
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
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addSpeWorkModal"
                  className="btn btn-primary btn-add font-14"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
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
                      <p className="card-title font-16">
                        لیست کارهای تخصصی مرکز
                      </p>
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
                  <SpecializedWorksListTable
                    data={speWorks}
                    deleteSpeWork={deleteSpeWork}
                    updateSpeWork={updateSpeWork}
                  />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddSpeWorkModal addSpeWork={addSpeWork} />

        <EditSpeWorkModal data={editSpeWork} editSpeWorks={editSpeWorks} />
      </div>
    </>
  );
};
export default SpecializedWorks;
