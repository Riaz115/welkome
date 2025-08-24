// import Modal from "components/modal";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoPaperPlaneOutline } from "react-icons/io5";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";

const SeeStory = (props) => {
  const { name, photo, content } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div
        onClick={onOpen}
        className="mb-1 flex flex-col items-center hover:cursor-pointer"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#FF5E62] text-2xl text-navy-700 dark:text-white">
          <img
            src={photo}
            className="flex h-full w-full items-center justify-center rounded-full"
            alt=""
          />
        </div>
        <p className="mt-[8px] text-sm font-medium dark:text-white">{name}</p>
      </div>
      <Modal className="!z-[100]" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="bg-[#000] !opacity-30" />
        <ModalContent className="top-[22vh] !m-auto !w-max !max-w-[85%] md:top-[12vh]">
          <ModalCloseButton className="absolute right-[24px] top-[24px] z-10 text-white" />
          <ModalBody>
            <div className="relative flex w-[400px] max-w-full items-center justify-center overflow-hidden rounded-2xl">
              <div className="relative">{content}</div>
              <div className="absolute bottom-5 z-[100] flex w-full px-3">
                <input
                  className="!border-whit mr-3 flex h-12 w-full items-center justify-center rounded-full border bg-white/0 p-3 text-sm text-white outline-none placeholder:text-white"
                  placeholder="Write your comment..."
                />
                <button
                  className="mr-3 bg-none px-0 hover:bg-none"
                  me="2px"
                  px="0px"
                  variant="no-hover"
                  bg="transparent"
                >
                  <MdOutlineFavoriteBorder className="h-6 w-6 text-white" />
                </button>
                <button className="bg-none px-0 hover:bg-none">
                  <IoPaperPlaneOutline className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="z-99 radius-2xl absolute top-0 h-full w-full bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.2)]" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SeeStory;
