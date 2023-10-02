import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import DtPicker, { convertToFa } from "react-calendar-datetime-picker";
import "react-calendar-datetime-picker/dist/index.css";
import JDate from "jalali-date";

const jdate = new JDate();
const currentYear = jdate.getFullYear();
const currentMonth = jdate.getMonth();
const currentDay = jdate.getDate();

const DatePicker = ({ setArticleDate, defDate }) => {
  let artDate = null;
  if (defDate) {
    defDate = defDate.replaceAll(/\//g, "");
    artDate = {
      year: parseInt(defDate.substr(0, 4)),
      month: parseInt(defDate.substr(4, 2)),
      day: parseInt(defDate.substr(6, 2)),
    };
  } else {
    artDate = {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    };
  }
  // console.log(artDate);

  const [todaysDate, setTodaysDate] = useState(artDate);
  const test = (e) => {
    if (e?.month.toString().length == 1) {
      e.month = "0" + e.month.toString();
    }
    if (e?.day.toString().length == 1) {
      e.day = "0" + e.day;
    }
    setArticleDate(e);
  };

  return (
    <>
      <div className="datePickerContainer d-flex align-items-center">
        <label className="lblAbs datePickerLbl font-12">
          تاریخ <span className="text-danger">*</span>
        </label>
        <DtPicker
          onChange={test}
          type="single"
          local="fa"
          inputClass="datePickerInput rounded font-12"
          headerClass="datePickerHeader"
          calenderModalClass="calenderModalContainer"
          placeholder="&nbsp;"
          daysClass="fullDay"
          inputName="date"
          required
          name="articleDate"
          initValue={artDate}
        />

        <i className="calendarIcon text-secondary">
          <FeatherIcon icon="calendar" />
        </i>
      </div>
    </>
  );
};

export default DatePicker;

