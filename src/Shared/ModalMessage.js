import React from 'react'
import Modal from 'react-responsive-modal';
import styled, { css } from 'styled-components';

const ModalStyled = styled.div`
  color: #282828;
  padding: 0rem 1.5rem 0.5rem 1.5rem;

  h3 {
    color: #26b99b;
  }
`;

const ModalMessage = ({open, close, message}) => {
  if (message === 'coinMaxed') return (
    <Modal open={open} onClose={close} center>
      <ModalStyled>
      <h3>Favorites Limit Reached</h3>
      <p>
        You can only add a maximum of 10 coins to your favorites. 
      </p>
      </ModalStyled>
    </Modal>
  )
}

export default ModalMessage
