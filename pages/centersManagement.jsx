"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import CentersListTable from "components/dashboard/centers/centersListTable/centersListTable";
import AddCenterModal from "components/dashboard/centers/addCenterModal/addCenterModal";

const CentersManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [centersData, setCentersData] = useState([]);

  //get all centers
  const getCentersData = () => {
    setIsLoading(true);
    let url = "Center/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setCentersData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const addCenter = () => {
    setIsLoading(true);
    let url = "Center/add";

    axiosClient.post(url, data).then((response) => {
      console.log(response.data);
      // setCentersData([...centersData, response.data]);

      $("#addCenterModal").modal("hide");
      setIsLoading(false);
      $("#frmAddCenter")[0].reset();
    });
  };

  useEffect(() => {
    getCentersData();
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addCenterModal"
                  className="btn btn-primary btn-add"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  افزودن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Menu List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title font-16">لیست مراکز</h5>
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
                  <CentersListTable data={centersData} />
                )}
              </div>

              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddCenterModal addCenter={addCenter} />
      </div>
    </>
  );
};
export default CentersManagement;
