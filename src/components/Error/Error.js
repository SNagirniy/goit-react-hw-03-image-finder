import errorImage from './error.jpeg';

export default function ErrorView() {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="no results" />
    </div>
  );
}
