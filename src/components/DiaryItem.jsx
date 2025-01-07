import "./DiaryItem.css"
import {getEmotionImage} from "../util/get-emotion-image.js";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

const DiaryItem = ({id, createdDate, emotionId, content}) => {
  const nav = useNavigate();

  return (
    <div className="diaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)} alt=""/>
      </div>
      <div
        onClick={() => nav(`/diary/${id}`)}
        className="info_section">
        <div className="date">{new Date(createdDate).toLocaleDateString()}</div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button text="수정하기" onClick={() => nav(`/edit/${id}`)} />
      </div>
    </div>
  )
}

export default DiaryItem