import { useState, useEffect } from "react";
import { axiosClient } from "class/axiosConfig.js";
import Head from "next/head";
import Select from "react-select";
import JDate from "jalali-date";
import { getSession } from "lib/session";
import OverviewStats from "components/dashboard/overview/overviewStats";
import Loading from "components/commonComponents/loading/loading";
import PieChartComponent from "components/dashboard/overview/statsPieChart";
import RequestsBarChart from "components/dashboard/overview/requestsBarChart";
// import { handleDateOptionsSelect } from "utils/defaultDateRanges";

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
  const [pieStatIsLoading, setPieStatIsLoading] = useState(false);
  const [generalStats, setGeneralStats] = useState([]);
  const [statsPlaceholder, setStatsPlaceholder] = useState(
    "امروز : " + jdate.format("dddd DD MMMM YYYY")
  );
  const [centerLabels, setCenterLabels] = useState([]);
  const [centerTotalStats, setCenterTotalStats] = useState([]);

  const overviewOptions = [
    { value: "lastWeek", label: "هفته گذشته" },
    { value: "yesterday", label: "دیروز" },
    { value: "today", label: "امروز : " + jdate.format("dddd DD MMMM YYYY") },
    {
      value: "lastMonth",
      label: "ماه جاری : " + jdate.format("MMMM YYY"),
    },
  ];

  const [DateFrom, setDateFrom] = useState(jdate.format("YYYY/MM/DD"));
  const [DateTo, setDateTo] = useState(jdate.format("YYYY/MM/DD"));
  const [selectedDateOption, setSelectedDateOption] = useState(null);

  const getGeneralStats = (duration) => {
    setStatsIsLoading(true);
    setPieStatIsLoading(true);
    let url = "Dashboard";
    let centerStatsUrl = "Dashboard";
    let centerReportsUrl = "Dashboard/CenterCountAppointment";

    if (duration === "today") {
      url += "/MngTodayStatistics";
      setStatsPlaceholder("امروز : " + jdate.format("dddd DD MMMM YYYY"));
    } else if (duration === "yesterday") {
      url += "/MngYesterDayStatistics";
      setStatsPlaceholder("دیروز");
    } else if (duration === "lastWeek") {
      url += "/MngLastWeekStatistics";
      setStatsPlaceholder("هفته گذشته");
    } else if (duration === "lastMonth") {
      url += "/MngMonthStatistics";
      setStatsPlaceholder("ماه جاری : " + jdate.format("MMMM YYY"));
    }

    if (duration === "today") {
      centerStatsUrl += "/MngTodayStatisticsGroupByCenter";
    } else if (duration === "yesterday") {
      centerStatsUrl += "/MngYesterDayStatisticsGroupByCenter";
    } else if (duration === "lastWeek") {
      centerStatsUrl += "/MngLastWeekStatisticsGroupByCenter";
    } else if (duration === "lastMonth") {
      centerStatsUrl += "/MngMonthStatisticsGroupByCenter";
    }

    // let reportsData = {
    //   DateFrom: DateFrom,
    //   DateTo: DateTo,
    // };

    // if (duration === "today") {
    //   reportsData = {
    //     DateFrom: jdate.format("YYYY/MM/DD"),
    //     DateTo: jdate.format("YYYY/MM/DD")
    //   }
    // } else if (duration === "yesterday") {
    //   handleDateOptionsSelect(
    //     "yesterday",
    //     setSelectedDateOption,
    //     setDateTo,
    //     setDateFrom
    //   );
    // } else if (duration === "lastWeek") {
    //   handleDateOptionsSelect(
    //     "lastWeek",
    //     setSelectedDateOption,
    //     setDateTo,
    //     setDateFrom
    //   );
    // } else {
    //   handleDateOptionsSelect(
    //     "lastMonth",
    //     setSelectedDateOption,
    //     setDateTo,
    //     setDateFrom
    //   );
    // }

    axiosClient
      .post(url)
      .then((response) => {
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
        const labels = [];
        const counts = [];

        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];

          if (item) {
            labels.push(item?.Center);
            counts.push(item?.Count);
          }
        }
        setCenterLabels(labels);
        setCenterTotalStats(counts);
        setPieStatIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPieStatIsLoading(false);
      });

    // axiosClient.post(centerReportsUrl)
    //   .then((response) => {
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  };

  useEffect(() => getGeneralStats(selectedDuration), [selectedDuration]);

  return (
    <>
      <Head>
        <title>داشبورد من</title>
      </Head>
      <div className="main-wrapper">
        <div className="page-wrapper">
          {statIsLoading || pieStatIsLoading ? (
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

              <OverviewStats generalStats={generalStats} />

              <div className="row">
                <div className="chart-container col-md-7 col-12">
                  <div className="card">
                    <div className="card-body">
                      <PieChartComponent
                        data={centerTotalStats}
                        labels={centerLabels}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-5 col-12">
                  <div className="card">
                    <div className="card-body">
                      {/* <RequestsBarChart /> */}
                    </div>
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
