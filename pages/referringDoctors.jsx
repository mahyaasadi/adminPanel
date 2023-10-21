import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import RefDocsTable from "components/dashboard/refDocs/refDocsTable";
import RefDocModal from "components/dashboard/refDocs/refDocModal";
import RefDocsSearch from "components/dashboard/refDocs/refDocsSearch";

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

const referringDoctors = ({ UserData }) => {
  const [refDocData, setRefDocData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRefDocData, setEditRefDocData] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // get referringDoctors list
  const getRefDocsData = () => {
    let url = "ReferrerPhysician/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then(function (response) {
        console.log(response.data);
        setRefDocData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // add new refDoctor
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const addRefDoctor = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "ReferrerPhysician/add";
    let data = {
      MSID: formProps.MSID,
      FullName: formProps.refDocFullName,
      Expertise: formProps.refDocExpertise,
      Tel: formProps.refDocTel,
      Address: formProps.refDocAddress,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setRefDocData([response.data, ...refDocData]);
        setShowModal(false);
        setIsLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // edit refDoctor
  const openEditRefDocModal = (data) => {
    setModalMode("edit");
    setEditRefDocData(data);
    setShowModal(true);
  };

  const editRefDoctor = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "ReferrerPhysician/Update";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      ID: formProps.refDocID,
      MSID: formProps.MSID,
      FullName: formProps.refDocFullName,
      Expertise: formProps.refDocExpertise,
      Tel: formProps.refDocTel,
      Address: formProps.refDocAddress,
    };

    console.log({ data });

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.refDocID, response.data);
        setShowModal(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateItem = (id, newArr) => {
    let index = refDocData.findIndex((x) => x._id === id);
    let g = refDocData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setRefDocData([
        ...refDocData.slice(0, index),
        g,
        ...refDocData.slice(index + 1),
      ]);
  };

  // delete doctor
  const deleteRefDoc = async (id) => {
    let result = await QuestionAlert(
      "حذف پزشک!",
      "آیا از حذف پزشک اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = "ReferrerPhysician/Delete";
      let data = {
        ID: id,
      };

      console.log({ data });

      await axiosClient
        .delete(url, { data })
        .then((response) => {
          setRefDocData(refDocData.filter((a) => a._id !== id));
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const searchRefDocs = (Text) => {
    let url = "ReferrerPhysician/FindByMSID/" + Text;

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setRefDocData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => getRefDocsData(), []);

  return (
    <>
      <Head>
        <title>پزشکان ارجاع دهنده</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex gap-2 justify-content-end media-srvHeader">
                  <RefDocsSearch
                    searchRefDocs={searchRefDocs}
                    getRefDocsData={getRefDocsData}
                  />
                  <button
                    className="btn btn-primary btn-add font-14 media-font-12"
                    onClick={openAddModal}
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    اضافه کردن
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
                        <p className="card-title font-14 text-secondary">
                          لیست پزشکان ارجاع دهنده
                        </p>
                      </div>
                    </div>
                  </div>
                  <RefDocsTable
                    data={refDocData}
                    openEditRefDocModal={openEditRefDocModal}
                    deleteRefDoc={deleteRefDoc}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <RefDocModal
          isLoading={isLoading}
          mode={modalMode}
          show={showModal}
          onHide={handleCloseModal}
          onSubmit={modalMode == "add" ? addRefDoctor : editRefDoctor}
          data={editRefDocData}
        />
      </div>
    </>
  );
};

export default referringDoctors;
