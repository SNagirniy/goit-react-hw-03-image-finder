import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import propTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, tag } = this.props;
    return createPortal(
      <div onClick={this.handleBackdropClick} className={s.modal_backdrop}>
        <div className={s.modal_content}>
          <img className={s.image} src={largeImage} alt={tag} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  largeImage: propTypes.string.isRequired,
  tag: propTypes.string.isRequired,
};
