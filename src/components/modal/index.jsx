import React, { Children } from "react";

import {
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  ModalContent,
} from "@chakra-ui/react";

export default function ModalComponent({onClose, modalOpen,onAction,modalTitle,children}) {
  return (
    <Modal isOpen={modalOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => {}}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
