import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import {useContext, useState} from "react";
import {DiaryStateContext} from "../App.jsx";
import DiaryList from "../components/DiaryList.jsx";

const getMonthlyData = (date, data) => {
  const begin = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  return data.filter((item) => {
    const itemDate = new Date(item.createdDate);
    return begin <= itemDate && itemDate <= end;
  });
};

const Home = () => {
  const [date, setDate] = useState(new Date());

  const onRightButtonClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  }

  const onLeftButtonClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  }

  const data = useContext(DiaryStateContext);
  const monthlyData = getMonthlyData(date, data);
  return (
    <div>
      <Header
        title={`${date.getFullYear()}년 ${date.getMonth() + 1} 월`}
        rightChild={<Button text=">" onClick={onRightButtonClick}/>}
        leftChild={<Button text="<" onClick={onLeftButtonClick}/>}/>
      <DiaryList data={monthlyData}/>
    </div>
  );
};

export default Home;