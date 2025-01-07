import "./DiaryList.css"
import DiaryItem from "./DiaryItem.jsx";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const DiaryList = ({data}) => {
  const nav = useNavigate()
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  }

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);

      if (sortType === "oldest") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="diary_list">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <Button type="POSITIVE" text="새 일기 쓰기" onClick={() => nav("/new")}></Button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default DiaryList;