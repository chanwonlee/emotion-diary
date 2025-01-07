import "./EmotionItem.css"
import {getEmotionImage} from "../util/get-emotion-image.js";

const EmotionItem = ({emotion_id, emotion_name, isSelected, onClick}) => {
  return (
    <div className={`emotionItem ${isSelected ? `emotionItem_on_${emotion_id}` : ""}`}
         onClick={onClick}>
      <img src={getEmotionImage(emotion_id)}/>
      <div>{emotion_name}</div>
    </div>
  )
}

export default EmotionItem;