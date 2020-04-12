import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type ModalContextType = {
  modals: { [key: string]: boolean };
  show: (id: string) => void;
  hide: (id: string) => void;
};

const ModalContext = React.createContext<ModalContextType>({
  modals: {},
  show: () => {},
  hide: () => {},
});

const { Provider, Consumer } = ModalContext;

const useModal = (id: string) => {
  const { show, hide } = useContext(ModalContext);

  const showModal = () => show(id);
  const hideModal = () => hide(id);

  return { showModal, hideModal };
};

const ModalOverlay = styled.div`
  display: fixed;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #99999980;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1010;
`;

const ModalContent = styled.div`
  z-index: 1020;
`;

const ModalProvider: React.FC = ({ children }) => {
  const [modals, setModal] = useState({});
  const container = document.getElementById('modal-root');

  if (!container) {
    return null;
  }

  return (
    <Provider
      value={{
        modals,
        show: (id) => setModal({ ...modals, [id]: true }),
        hide: (id) => setModal({ ...modals, [id]: false }),
      }}
    >
      {children}
    </Provider>
  );
};

const Modal: React.FC<{ modalId: string }> = ({ children, modalId }) => {
  const container = document.getElementById('modal-root');

  if (!container) {
    return null;
  }

  return createPortal(
    <Consumer>
      {({ modals }) =>
        modals[modalId] && (
          <ModalContainer>
            <ModalContent>{children}</ModalContent>
            <ModalOverlay />
          </ModalContainer>
        )
      }
    </Consumer>,
    container
  );
};

export { ModalProvider, Modal, useModal };

export default Modal;
