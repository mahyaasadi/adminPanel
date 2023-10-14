import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Head from "next/head";
import Select from "react-select";
import JDate from "jalali-date";
import { getSession } from "lib/session";
import OverviewStats from "components/dashboard/overview/overviewStats";
import Loading from "components/commonComponents/loading/Loading";
import PieChartComponent from "components/dashboard/overview/statsPieChart";

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

const jdate = new JDate();
const Dashboard = ({ UserData }) => {
  const [selectedDuration, setSelectedDuration] = useState("today");
  const [statIsLoading, setStatsIsLoading] = useState(true);
  const [generalStats, setGeneralStats] = useState([]);
  const [statsPlaceholder, setStatsPlaceholder] = useState(
    "امروز : " + jdate.format("dddd DD MMMM YYYY")
  );
  const [centerLabels, setCenterLabels] = useState([]);
  const [centerTotalStats, setCenterTotalStats] = useState([]);

  const overviewOptions = [
    { value: "today", label: "امروز : " + jdate.format("dddd DD MMMM YYYY") },
    { value: "lastWeek", label: "هفته گذشته" },
    {
      value: "lastMonth",
      label: "ماه جاری : " + jdate.format("MMMM YYY"),
    },
  ];

  const getGeneralStats = (duration) => {
    setStatsIsLoading(true);
    let url = "Dashboard";
    let centerStatsUrl = "Dashboard";

    if (duration === "today") {
      url += "/MngTodayStatistics";
      setStatsPlaceholder("امروز : " + jdate.format("dddd DD MMMM YYYY"));
    } else if (duration === "lastWeek") {
      url += "/MngLastWeekStatistics";
      setStatsPlaceholder("هفته گذشته");
    } else if (duration === "lastMonth") {
      url += "/MngMonthStatistics";
      setStatsPlaceholder("ماه جاری : " + jdate.format("MMMM YYY"));
    }

    if (duration === "today") {
      centerStatsUrl += "/MngTodayStatisticsGroupByCenter";
    } else if (duration === "lastWeek") {
      centerStatsUrl += "/MngLastWeekStatisticsGroupByCenter";
    } else if (duration === "lastMonth") {
      centerStatsUrl += "/MngMonthStatisticsGroupByCenter";
    }

    axiosClient
      .post(url)
      .then((response) => {
        console.log(response.data);
        setGeneralStats(response.data);
        setStatsIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setStatsIsLoading(false);
      });

    axiosClient
      .post(centerStatsUrl)
      .then((response) => {
        console.log(response.data);
        const labels = [];
        const counts = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          labels.push(item.Center);
          counts.push(item.Count);
        }
        setCenterLabels(labels);
        setCenterTotalStats(counts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGeneralStats(selectedDuration);
  }, [selectedDuration]);

  return (
    <>
      <Head>
        <title>داشبورد من</title>
      </Head>
      <div className="main-wrapper">
        <div className="page-wrapper">
          {statIsLoading ? (
            <Loading />
          ) : (
            <div className="content container-fluid pb-0">
              <div className="overview-container">
                <div className="dashboard-header">
                  <div className="col overview-title">
                    <p className="card-title font-16">بررسی اجمالی مراکز</p>
                  </div>

                  <div className="dashboard-selector font-13">
                    <Select
                      className="select"
                      onChange={(e) => setSelectedDuration(e.value)}
                      options={overviewOptions}
                      placeholder={statsPlaceholder}
                      id="long-value-select"
                      instanceId="long-value-select"
                    />
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <div className="">
                  <OverviewStats class generalStats={generalStats} />
                </div>
                <div className="card col-5 d-flex justify-center">
                  <div className="card-body">
                    <PieChartComponent
                      data={centerTotalStats}
                      labels={centerLabels}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
