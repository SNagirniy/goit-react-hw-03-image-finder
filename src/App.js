import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import pictureAPI from './components/Services';
import Loader from 'components/Loader';
import ErrorView from 'components/Error';
import Button from 'components/Button';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    query: '',
    showModal: false,
    largeImage: '',
    tags: '',
    data: [],
    status: Status.IDLE,
    error: null,
    page: 1,
    total_results: false,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  componentDidUpdate(PrevProps, PrevState) {
    const prevQuery = PrevState.query;
    const nextQuery = this.state.query;
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

  togleModal = (largeImageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: largeImageURL ? largeImageURL : '',
      tags: tag ? tag : '',
    }));
  };

  render() {
    const { status, showModal, largeImage, tags, data, total_results } =
      this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <div className={s.idle_message}>Please, enter search query.</div>
        )}

        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
          <ImageGallery openModal={this.togleModal} data={data} />
        )}

        {total_results > data.length && <Button loadMore={this.nextPage} />}

        {status === 'rejected' && <ErrorView />}

        {showModal && (
          <Modal onClose={this.togleModal} largeImage={largeImage} tag={tags} />
        )}
      </div>
    );
  }
}
