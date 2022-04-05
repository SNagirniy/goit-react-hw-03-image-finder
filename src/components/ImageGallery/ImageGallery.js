import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ data, openModal }) {
  return (
    <ul className={s.ImageGallery}>
      {data.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            alt={tags}
            largeImageURL={largeImageURL}
            onImageClick={() => {
              openModal(largeImageURL, tags);
            }}
          />
        );
      })}
    </ul>
  );
}

/*
export default class ImageGallery extends Component {
  state = {
    data: [],
    status: Status.IDLE,
    error: null,
    page: 1,
    total_results: false,
  };

  componentDidUpdate(PrevProps, PrevState) {
    const prevQuery = PrevProps.query;
    const nextQuery = this.props.query;
    const { page } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING, page: 1 });

      pictureAPI
        .fetchPictures(nextQuery)
        .then(({ hits, total }) =>
          this.setState({
            data: hits,
            status: hits.length !== 0 ? Status.RESOLVED : Status.REJECTED,
            total_results: total,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    } else if (PrevState.page < page) {
      this.setState({ status: Status.PENDING });

      pictureAPI
        .fetchPictures(nextQuery, page)
        .then(({ hits }) =>
          this.setState({
            data: [...PrevState.data, ...hits],
            status: Status.RESOLVED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  nextPage = () => {
    const { total_results, data } = this.state;
    if (total_results > data.length) {
      this.setState(PrevState => ({
        page: PrevState.page + 1,
      }));
    }
    return;
  };

  render() {
    const { data, status, total_results } = this.state;

    if (status === 'idle') {
      return <div className={s.idle_message}>Please, enter search query.</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {data.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  url={webformatURL}
                  alt={tags}
                  largeImageURL={largeImageURL}
                  onImageClick={() => {
                    this.props.openModal(largeImageURL, tags);
                  }}
                />
              );
            })}
          </ul>
          {total_results > data.length && <Button loadMore={this.nextPage} />}
        </>
      );
    }

    if (status === 'rejected') {
      return <ErrorView />;
    }
  }
}
*/
ImageGallery.propTypes = {
  data: propTypes.array.isRequired,
  openModal: propTypes.func.isRequired,
};
