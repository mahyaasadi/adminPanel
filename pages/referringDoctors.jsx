import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
// import RefDocsTable from "components/dashboard/refDocs/refDocsTable";
// import RefDocModal from "components/dashboard/refDocs/refDocModal";

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

const SpecialDiseases = ({ UserData }) => {
  const Router = useRouter();

  const [refDocData, setRefDocData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRefDocData, setEditRefDocData] = useState([]);

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

  //   // add new disease
  //   const addDisease = (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);

  //     CenterID = Router.query.id;
  //     let url = "Center/addSpecialDiseases";
  //     let formData = new FormData(e.target);
  //     const formProps = Object.fromEntries(formData);

  //     let data = {
  //       CenterID: CenterID,
  //       Name: formProps.diseaseName,
  //       EngName: formProps.diseaseEngName,
  //     };

  //     if (CenterID) {
  //       axiosClient
  //         .post(url, data)
  //         .then((response) => {
  //           setDiseasesList([...diseasesList, response.data]);
  //           $("#addSpecialDiseaseModal").modal("hide");
  //           setIsLoading(false);
  //           e.target.reset();
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setIsLoading(false);
  //         });
  //     }
  //   };

  //   // edit disease
  //   const editDisease = (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);

  //     CenterID = Router.query.id;
  //     let url = "Center/EditSpecialDiseases";
  //     let formData = new FormData(e.target);
  //     const formProps = Object.fromEntries(formData);

  //     let data = {
  //       CenterID: CenterID,
  //       SDID: formProps.diseaseId,
  //       Name: formProps.editDiseaseName,
  //       EngName: formProps.editDiseaseEngName,
  //     };

  //     if (CenterID) {
  //       axiosClient
  //         .post(url, data)
  //         .then((response) => {
  //           console.log(response.data);
  //           updateItem(formProps.diseaseId, response.data);
  //           $("#editSpecialDiseaseModal").modal("hide");
  //           setIsLoading(false);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setIsLoading(false);
  //           ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
  //         });
  //     }
  //   };

  //   const updateItem = (id, newArr) => {
  //     let index = diseasesList.findIndex((x) => x._id === id);
  //     let g = diseasesList[index];
  //     g = newArr;

  //     if (index === -1) {
  //       // handle error
  //       console.log("no match");
  //     } else
  //       setDiseasesList([
  //         ...diseasesList.slice(0, index),
  //         g,
  //         ...diseasesList.slice(index + 1),
  //       ]);
  //   };

  //   const openEditRefDocModal = (data) => {
  //     setEditRefDocData(data);
  //     openRefDocModal(true)
  // };

  //   // delete doctor
  //   const deleteRefDoc = async (id) => {
  //     CenterID = Router.query.id;
  //     let result = await QuestionAlert(
  //       "حذف پزشک!",
  //       "آیا از حذف پزشک اطمینان دارید؟"
  //     );

  //     if (result) {
  //       setIsLoading(true);
  //       let url = "RefDoc/Delete";
  //       let data = {
  //         CenterIDو
  //         MSID: id,
  //       };

  //       if (CenterID) {
  //         await axiosClient
  //           .delete(url, { data })
  //           .then((response) => {
  //             setRefDocData(refDocData.filter((a) => a._id !== id));
  //             setIsLoading(false);
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //             setIsLoading(false);
  //           });
  //       }
  //     }
  //   };

  useEffect(() => {
    getRefDocsData();
  }, []);

  return (
    <>
      <Head>
        <title>پزشکان ارجاع دهنده</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-add font-14 media-font-12"
                  //   onClick={openAddModal}
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
                {/* <RefDocsTable
                  data={diseasesList}
                  openEditRefDocModal={openEditRefDocModal}
                  deleteRefDoc={deleteRefDoc}
                /> */}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        {/* <RefDocModal /> */}
      </div>
    </>
  );
};

export default SpecialDiseases;
