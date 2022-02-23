import { Component } from 'react';
import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import pictureAPI from '../Services/ServicesAPI';
import Loader from 'components/Loader';
import ErrorView from 'components/Error';
import Button from 'components/Button';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    data: [],
    status: Status.IDLE,
    error: null,
    page: 1,
    button_show: false,
  };

  componentDidUpdate(PrevProps, PrevState) {
    const prevQuery = PrevProps.query;
    const nextQuery = this.props.query;
    const { page } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });

      pictureAPI
        .fetchPictures(nextQuery)
        .then(({ hits, totalHits }) =>
          this.setState({
            data: hits,
            status: hits.length !== 0 ? Status.RESOLVED : Status.REJECTED,
            button_show: totalHits > page ? true : false,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    } else if (PrevState.page < page) {
      this.setState({ status: Status.PENDING });

      pictureAPI
        .fetchPictures(nextQuery, page)
        .then(({ hits, totalHits }) =>
          this.setState({
            data: [...PrevState.data, ...hits],
            status: Status.RESOLVED,
            button_show: totalHits > page ? true : false,
          })
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  nextPage = () => {
    this.setState(PrevState => ({
      page: PrevState.page + 1,
    }));
  };

  render() {
    const { data, status, button_show } = this.state;

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
          {button_show && <Button loadMore={this.nextPage} />}
        </>
      );
    }

    if (status === 'rejected') {
      return <ErrorView />;
    }
  }
}

ImageGallery.propTypes = {
  query: propTypes.string.isRequired,
  openModal: propTypes.func.isRequired,
};
