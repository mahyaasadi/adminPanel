import { useState, useEffect } from "react";
import Head from "next/head";
import Select from "react-select";
import JDate from "jalali-date";
import Loading from "components/commonComponents/loading/Loading";
import OverviewStats from "components/dashboard/overview/overviewStats";

const jdate = new JDate();

const Dashboard = () => {
  const [selectedDuration, setSelectedDuration] = useState("today");
  const overviewOptions = [
    { value: "today", label: "امروز : " + jdate.format("dddd DD MMMM YYYY") },
    { value: "lastWeek", label: "هفته گذشته" },
    {
      value: "lastMonth",
      label: "ماه جاری : " + jdate.format("MMMM YYY"),
    },
  ];

  return (
    <>
      <Head>
        <title>داشبورد من</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid pb-0">
          <div className="overview-container">
            <div className="dashboard-header">
              <div className="col overview-title">
                {/* <p className="card-title">بررسی اجمالی</p> */}
              </div>

              <div className="dashboard-selector font-13">
                <Select
                  className="select"
                  onChange={(e) => setSelectedDuration(e.value)}
                  options={overviewOptions}
                  placeholder={"امروز : " + jdate.format("dddd DD MMMM YYYY")}
                  id="long-value-select"
                  instanceId="long-value-select"
                />
              </div>
            </div>
          </div>

          <OverviewStats />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
