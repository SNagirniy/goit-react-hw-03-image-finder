import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import s from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    showModal: false,
    largeImage: '',
    tags: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  togleModal = (largeImageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: largeImageURL ? largeImageURL : '',
      tags: tag ? tag : '',
    }));
  };

  render() {
    const { query, showModal, largeImage, tags } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery openModal={this.togleModal} query={query} />
        {showModal && (
          <Modal onClose={this.togleModal} largeImage={largeImage} tag={tags} />
        )}
      </div>
    );
  }
}
