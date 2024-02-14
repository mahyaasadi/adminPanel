import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import SpecialDiseasesModal from "components/dashboard/specialDiseases/speDiseasesModal";
import SpecialDiseasesListTable from "components/dashboard/specialDiseases/specialDiseasesListTable";

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
const SpecialDiseases = ({ UserData }) => {
  const Router = useRouter();

  const [diseasesList, setDiseasesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editDiseaseData, setEditDiseaseData] = useState([]);
  const [modalMode, setModalMode] = useState("add"); // Default mode
  const [showModal, setShowModal] = useState(false);
  const [hiddenData, setHiddenData] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  // get diseases list
  const getDiseasesData = () => {
    CenterID = Router.query.id;
    setIsLoading(true);

    let url = `Center/getSpecialDiseases/${CenterID}`;
    if (CenterID) {
      axiosClient
        .get(url)
        .then(function (response) {
          setDiseasesList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // add new disease
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const addDisease = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    CenterID = Router.query.id;

    let url = "Center/addSpecialDiseases";
    let data = {
      CenterID: CenterID,
      Name: formProps.diseaseName,
      EngName: formProps.diseaseEngName,
    };

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          setDiseasesList([...diseasesList, response.data]);
          setShowModal(false);
          setIsLoading(false);
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // edit disease
  const updateDisease = (data) => {
    setEditDiseaseData(data);
    setModalMode("edit");
    setShowModal(true);
  };

  const editDisease = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    CenterID = Router.query.id;

    let url = "Center/EditSpecialDiseases";
    let data = {
      CenterID: CenterID,
      SDID: formProps.diseaseId,
      Name: formProps.editDiseaseName,
      EngName: formProps.editDiseaseEngName,
    };

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          updateItem(formProps.diseaseId, response.data);
          setShowModal(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
        });
    }
  };

  const updateItem = (id, newArr) => {
    let index = diseasesList.findIndex((x) => x._id === id);
    let g = diseasesList[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setDiseasesList([
        ...diseasesList.slice(0, index),
        g,
        ...diseasesList.slice(index + 1),
      ]);
  };

  // delete disease
  const deleteDisease = async (id) => {
    let result = await QuestionAlert(
      "حذف بیماری !",
      "آیا از حذف بیماری خاص اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      CenterID = Router.query.id;
      let url = "Center/DeleteSpecialDiseases";
      let data = {
        CenterID: CenterID,
        SDID: id,
      };

      if (CenterID) {
        await axiosClient
          .delete(url, { data })
          .then(function () {
            setDiseasesList(diseasesList.filter((a) => a._id !== id));
            setIsLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    if (Router.isReady) {
      CenterID = Router.query.id;

      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));
      if (hiddenData) localStorage.removeItem("hiddenData");

      getDiseasesData();
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>بیماری های خاص</title>
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
                    onClick={openAddModal}
                    className="btn btn-primary btn-add font-14 media-font-12"
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
                          لیست بیماری های خاص {""} {hiddenData?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <SpecialDiseasesListTable
                    data={diseasesList}
                    updateDisease={updateDisease}
                    deleteDisease={deleteDisease}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <SpecialDiseasesModal
          mode={modalMode}
          data={editDiseaseData}
          isLoading={isLoading}
          onHide={handleCloseModal}
          show={showModal}
          onSubmit={modalMode == "edit" ? editDisease : addDisease}
        />
      </div>
    </>
  );
};

export default SpecialDiseases;
