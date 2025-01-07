import Header from "../components/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App.jsx";
import useDiary from "../hooks/useDiary.jsx";

const Edit = () => {
  const id = useParams().id;
  const {onUpdate, onDelete} = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  const curDiaryItem = useDiary(id);

  const onSubmit = (input) => {
    onUpdate(id, input.createdDate, input.emotionId, input.content)
    nav("/", {replace: true})
  }

  const onClickDelete = () => {
    const result = window.confirm("정말 삭제하시겠습니까?")
    if (result) {
      onDelete(id);
      nav("/", {replace: true})
    }
  }

  return (
    <div>
      <Header
        title="일기 수정하기"
        rightChild={
          <Button
            text="삭제하기"
            type={"NEGATIVE"}
            onClick={onClickDelete}
          />
        }
        leftChild={
          <Button
            text="< 뒤로 가기"
            onClick={() => nav(-1)}/>
        }
      />
      <Editor onSubmit={onSubmit} initData={curDiaryItem}/>
    </div>
  );
};

export default Edit;