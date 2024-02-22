import { useState } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FilteredCentersList from "components/dashboard/centersReports/filteredCentersList";
import FilterCentersReports from "components/dashboard/centersReports/filterCentersReports";

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

const CentersReports = ({ UserData }) => {
  const [filteredCenters, setFilteredCenters] = useState([]);

  const getFilteredCenters = (items) => setFilteredCenters(items);

  return (
    <>
      <Head>
        <title>گزارش نوبت های مراکز</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <FilterCentersReports getFilteredCenters={getFilteredCenters} />

          <div className="card">
            <div className="card-header border-bottom-0">
              <div className="row align-items-center">
                <div className="col">
                  <p className="card-title font-15 text-secondary"></p>
                </div>
              </div>
            </div>

            <FilteredCentersList data={filteredCenters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CentersReports;
