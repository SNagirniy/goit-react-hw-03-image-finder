import errorImage from './error.jpeg';
import s from './Error.module.css';

export default function ErrorView() {
  return (
    <div className={s.error_image} role="alert">
      <img src={errorImage} width="240" alt="no results" />
    </div>
  );
}
