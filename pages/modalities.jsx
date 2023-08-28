"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ModalityListTable from "components/dashboard/modalities/modalityListTable";
import AddModalityModal from "components/dashboard/modalities/addModalityModal/addModalityModal";

const Modalities = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalityData, setModalityData] = useState([]);

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

  const openAddModalityModal = () => {
    $("#addModalityModal").modal("show")
  }

  const addModality = () => {
    let url = "Modality/add";
    let data = {
        // FullName: ,
        

    }
  }

  useEffect(() => {
    getModalities();
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
                <div className="col-md-12 d-flex justify-content-end">
                  <button
                    onClick={openAddModalityModal}
                    //   data-bs-toggle="modal"
                    //   data-bs-target="#addToMenuModal"
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

                  <ModalityListTable data={modalityData} />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddModalityModal />
      </div>
    </>
  );
};

export default Modalities;
