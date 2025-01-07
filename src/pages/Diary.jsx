import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Viewer from "../components/Viewer.jsx";
import useDiary from "../hooks/useDiary.jsx";
import getStringedDate from "../util/get-stringed-date.js";

const Diary = () => {
  const nav = useNavigate()
  const id = useParams().id;
  const curDiaryItem = useDiary(id);
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  const {createdDate, emotionId, content} = curDiaryItem;

  return (
    <div>
      <Header title={getStringedDate(createdDate) + " 기록"}
              leftChild={<Button text="< 뒤로 가기"
                                 onClick={() => nav(-1)}/>}
              rightChild={<Button text="수정하기"
                                  type="NEGATIVE"
                                  onClick={() => nav(`/edit/${id}`)}/>}/>
      <Viewer emotionId={emotionId} content={content}/>
    </div>
  );
}

export default Diary