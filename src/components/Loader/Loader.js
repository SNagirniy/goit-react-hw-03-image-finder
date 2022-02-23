import { ImSpinner9 } from 'react-icons/im';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.loader} role="alert">
      {' '}
      <ImSpinner9 className={s.spiner} />
      Loading...
    </div>
  );
}
