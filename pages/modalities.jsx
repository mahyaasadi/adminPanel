"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ModalityListTable from "components/dashboard/modalities/modalityListTable";
import AddModalityModal from "components/dashboard/modalities/addModalityModal";
import EditModalityModal from "components/dashboard/modalities/editModalityModal";
import SubModalitiesModal from "components/dashboard/modalities/subModalities/subModalitiesModal";
import AddSubModalityModal from "components/dashboard/modalities/subModalities/addSubModalityModal";
import EditSubModalityModal from "components/dashboard/modalities/subModalities/editSubModalityModal";

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

let ActiveModalityID,
  ActiveModalityName = null;
const Modalities = ({ UserData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalityData, setModalityData] = useState([]);
  const [editModalityData, setEditModalityData] = useState({ empty: 1 });

  const [subModalityData, setSubModalityData] = useState([]);
  const [editSubModalityData, setEditSubModalityData] = useState([]);

  // get all modalities
  const getModalities = () => {
    let url = "Modality/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setModalityData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // Add Modality
  const openAddModalityModal = () => {
    $("#addModalityModal").modal("show");
  };

  const addModality = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Modality/add";
    let data = {
      _id: formProps.addModalityID,
      Modality: formProps.addModalityName,
      FullName: formProps.addModalityFullName,
      PerFullName: formProps.addModalityPerFullName,
      Icon: formProps.addModalityIcon,
      Disabled: formProps.modalityDisabledSwitch === "on" ? false : true,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setIsLoading(false);
        setModalityData([...modalityData, response.data]);

        $("#addModalityModal").modal("hide");
        e.target.reset();
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
          setDisabledheckboxStatus({ modalityDisabledCheckbox: false }))
        : ($(".callToActionCheckbox").prop("checked", false),
          setDisabledheckboxStatus({ modalityDisabledCheckbox: true }));
    }
  }

  const updateModality = (data, id) => {
    $("#editModalityModal").modal("show");
    setEditModalityData(data);
    ActiveModalityID = id;
  };

  const editModality = async (e) => {
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

    axiosClient
      .put(url, Data)
      .then((response) => {
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

  // ----- subModalities ------
  const openSubModalitiesModal = (data, ModalityName, ModalityId) => {
    $("#subModalitiesModal").modal("show");
    ActiveModalityID = ModalityId;
    ActiveModalityName = ModalityName;
    setSubModalityData(data.Sub);
  };

  // add
  const openAddSubModalityModal = () => $("#addSubModalityModal").modal("show");

  const addSubModality = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "Modality/addSub";
    let data = {
      ModalityID: ActiveModalityID,
      Name: formProps.addSubModalityName,
      Title: formProps.addSubModalityTitle,
      Link: formProps.addSubModalityLink,
      Des: formProps.addSubModalityDes,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setSubModalityData([...subModalityData, response.data]);

        getModalities();
        $("#addSubModalityModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("خطا", "افزودن زیر مجموعه با خطا مواجه گردید!");
        setIsLoading(false);
      });
  };

  // delete
  const deleteSubModality = async (id) => {
    let result = await QuestionAlert(
      "حذف زیر مجموعه !",
      "آیا از حذف زیر مجموعه اطمینان دارید؟"
    );

    if (result) {
      let url = "Modality/Sub";
      let data = {
        ModalityID: ActiveModalityID,
        SubID: id,
      };

      await axiosClient
        .delete(url, { data })
        .then((response) => {
          setSubModalityData(subModalityData.filter((a) => a._id !== id));
          getModalities();
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "حذف زیر مجموعه با خطا مواجه گردید!");
        });
    }
  };

  // edit
  const updateSubModality = (data) => {
    setEditSubModalityData(data);
    $("#editSubModalityModal").modal("show");
  };

  const editSubModality = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "Modality/editSub";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      SubID: formProps.editSubModalityId,
      Name: formProps.editSubModalityName,
      Title: formProps.editSubModalityTitle,
      Link: formProps.editSubModalityLink,
      Des: formProps.editSubModalityDes,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        updateSubItem(formProps.editSubModalityId, response.data);
        getModalities();
        $("#editSubModalityModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
        setIsLoading(false);
      });
  };

  const updateSubItem = (id, newArr) => {
    let index = subModalityData.findIndex((x) => x._id === id);
    let g = subModalityData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setSubModalityData([
        ...subModalityData.slice(0, index),
        g,
        ...subModalityData.slice(index + 1),
      ]);
  };

  useEffect(() => getModalities(), []);

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
                        <h5 className="card-title font-16">
                          لیست بخش های مرکز
                        </h5>
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
                    openSubModalitiesModal={openSubModalitiesModal}
                  />
                </div>
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

        <SubModalitiesModal
          data={subModalityData}
          modalityName={ActiveModalityName}
          openAddSubModalityModal={openAddSubModalityModal}
          deleteSubModality={deleteSubModality}
          updateSubModality={updateSubModality}
        />

        <AddSubModalityModal
          addSubModality={addSubModality}
          isLoading={isLoading}
        />

        <EditSubModalityModal
          data={editSubModalityData}
          isLoading={isLoading}
          editSubModality={editSubModality}
        />
      </div>
    </>
  );
};

export default Modalities;
