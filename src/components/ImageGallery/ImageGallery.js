import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import pictureAPI from '../Services/ServicesAPI';
import Loader from 'components/Loader';
import ErrorView from 'components/Error';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    data: null,
    status: Status.IDLE,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });

      pictureAPI
        .fetchPictures(nextQuery)
        .then(({ hits }) =>
          this.setState({
            data: hits,
            status: hits.length !== 0 ? Status.RESOLVED : Status.REJECTED,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { data, status } = this.state;

    if (status === 'idle') {
      return <div>Please enter search query.</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <ul>
          {data.map(({ id, webformatURL, tags, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                largeImageURL={largeImageURL}
                onImageClick={() => {
                  this.props.openModal(largeImageURL);
                }}
              />
            );
          })}
        </ul>
      );
    }

    if (status === 'rejected') {
      return <ErrorView />;
    }
  }
}
