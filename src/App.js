import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  state = {
    query: '',
    showModal: false,
    largeImage: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  togleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: largeImageURL,
    }));
  };

  render() {
    const { query, showModal, largeImage } = this.state;
    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery openModal={this.togleModal} query={query} />
        {showModal && (
          <Modal onClose={this.togleModal} largeImage={largeImage} />
        )}
      </div>
    );
  }
}
