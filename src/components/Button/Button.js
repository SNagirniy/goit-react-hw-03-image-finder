export default function Button({ loadMore }) {
  return (
    <button onClick={loadMore}>
      <span>Load more</span>
    </button>
  );
}
