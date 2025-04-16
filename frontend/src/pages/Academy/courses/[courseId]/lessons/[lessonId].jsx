import { useParams } from 'react-router-dom';
import VideoPlayer from '../../../../components/academy/VideoHosting/Player';

export default function LessonPage() {
  const { lessonId } = useParams();

  return (
    <div className="lesson-container">
      <VideoPlayer lessonId={lessonId} />
    </div>
  );
}