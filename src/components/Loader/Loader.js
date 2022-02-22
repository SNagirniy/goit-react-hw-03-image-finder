import { ImSpinner9 } from 'react-icons/im';

export default function Loader() {
  return (
    <div role="alert">
      {' '}
      <ImSpinner9 size="32" />
      Loading...
    </div>
  );
}
