"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ModalityListTable from "components/dashboard/modalities/modalityListTable";
import AddModalityModal from "components/dashboard/modalities/addModalityModal/addModalityModal";
import EditModalityModal from "components/dashboard/modalities/editModalityModal/editModalityModal";

let ActiveModalityID = null;

const Modalities = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalityData, setModalityData] = useState([]);
  const [editModalityData, setEditModalityData] = useState({ empty: 1 });

  // get all modalities
  const getModalities = () => {
    let url = "Modality/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setModalityData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // Convert imageUrl to Base64
  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => resolve(fileReader.result);
  //     fileReader.onerror = (error) => reject(error);
  //   });
  // };

  const openAddModalityModal = () => {
    $("#addModalityModal").modal("show");
  };

  // let modalityIcon = null;
  const addModality = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    // if (formProps.addModalityIcon && formProps.addModalityIcon.size != 0) {
    //   modalityIcon = await convertBase64(formProps.addModalityIcon);
    // }

    let url = "Modality/add";
    let data = {
      _id: formProps.addModalityID,
      Modality: formProps.addModalityName,
      FullName: formProps.addModalityFullName,
      PerFullName: formProps.addModalityPerFullName,
      Icon: formProps.addModalityIcon,
      Disabled: formProps.modalityDisabledSwitch === "on" ? false : true,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);

        setModalityData([...modalityData, response.data]);
        $("#addModalityModal").modal("hide");
        e.target.reset();
        // $("#addModalityIcon").val("");
        // subArticleImg = null;
        // $("#modalityIconPreview").attr("src", "");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن بخش با خطا مواجه گردید!");
      });
  };

  // edit modality
  let modalityDisabledCheckbox = false;
  const [disabledCheckboxStatus, setDisabledheckboxStatus] = useState({
    modalityDisabledCheckbox,
  });

  const handleCheckedDisabledModality = (e) => {
    const { value, checked } = e.target;
    const { modalityDisabledCheckbox } = disabledCheckboxStatus;

    checked
      ? setDisabledheckboxStatus({ modalityDisabledCheckbox: false })
      : setDisabledheckboxStatus({ modalityDisabledCheckbox: true });
  };

  function handleDisabledSwitch(data) {
    if (data?.empty !== 1) {
      $("#editDisabledModalityCheckbox" + data?._id).prop("checked", false);
      data?.Disabled === false
        ? ($(".editModalityDisabledCheckbox").prop("checked", true),
          setDisabledheckboxStatus({ modalityDisabledCheckbox: true }))
        : ($(".callToActionCheckbox").prop("checked", false),
          setDisabledheckboxStatus({ modalityDisabledCheckbox: false }));
    }
  }

  const updateModality = (data, id) => {
    $("#editModalityModal").modal("show");
    setEditModalityData(data);
    ActiveModalityID = id;
    console.log(ActiveModalityID);
  };

  const editModality = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = `/Modality/update/${ActiveModalityID}`;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let Data = {
      _id: formProps.editModalityID,
      Modality: formProps.editModalityName,
      FullName: formProps.editModalityFullName,
      PerFullName: formProps.editModalityPerFullName,
      Icon: formProps.editModalityIcon,
      Disabled: disabledCheckboxStatus.modalityDisabledCheckbox,
    };

    console.log("data", Data);

    axiosClient
      .put(url, Data)
      .then((response) => {
        console.log(response.data);
        updateModalityItem(formProps.editModalityID, response.data);

        $("#editModalityModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateModalityItem = (id, newArr) => {
    let index = modalityData.findIndex((x) => x._id === id);
    let g = modalityData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setModalityData([
        ...modalityData.slice(0, index),
        g,
        ...modalityData.slice(index + 1),
      ]);
  };

  useEffect(() => {
    getModalities();
  }, []);

  return (
    <>
      <Head>
        <title>مدیریت بخش ها</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end">
                  <button
                    onClick={openAddModalityModal}
                    className="btn btn-primary btn-add"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    افزودن
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header border-bottom-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="card-title font-16">لیست بخش ها</h5>
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

                  <ModalityListTable
                    data={modalityData}
                    updateModality={updateModality}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddModalityModal addModality={addModality} isLoading={isLoading} />

        <EditModalityModal
          data={editModalityData}
          editModality={editModality}
          isLoading={isLoading}
          handleDisabledSwitch={handleDisabledSwitch}
          handleCheckedDisabledModality={handleCheckedDisabledModality}
        />
      </div>
    </>
  );
};

export default Modalities;
