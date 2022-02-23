import propTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ loadMore }) {
  return (
    <button className={s.button} onClick={loadMore}>
      <span>Load more</span>
    </button>
  );
}

Button.propTypes = {
  loadMore: propTypes.func.isRequired,
};
