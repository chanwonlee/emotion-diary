import "./Editor.css"
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import getStringedDate from "../util/get-stringed-date.js";
import {emotionList} from "../util/constants.js";

const Editor = ({initData, onSubmit}) => {
  const nav = useNavigate()

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: ""
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData])

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickEmotionItem = (emotionId) => {
    onChangeInput({
      target: {
        name: "emotionId",
        value: emotionId,
      }
    });
  }

  return (
    <div className="editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input name="createdDate" value={getStringedDate(input.createdDate)} type="date" onChange={onChangeInput}/>
      </section>

      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {
            emotionList.map((item, index) => (
              <EmotionItem
                emotion_id={item.emotionId}
                key={index}
                emotion_name={item.emotionName}
                isSelected={input.emotionId === item.emotionId}
                onClick={() => onClickEmotionItem(item.emotionId)}/>
            ))
          }
        </div>
      </section>

      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea name="content"
                  value={input.content}
                  onChange={onChangeInput}
                  placeholder="오늘은 어땠나요?"></textarea>
      </section>

      <section className="button_section">
        <Button text="취소하기" onClick={() => nav(-1)}></Button>
        <Button text="작성완료" type="POSITIVE"
                onClick={() => onSubmit(input)}></Button>
      </section>
    </div>
  )
}

export default Editor;