import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Tooltip,
} from "@chakra-ui/react";

function EditProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        className="border-[1px] border-gray-600 py-2 px-4 rounded-full absolute mt-4 right-6 font-semibold"
        onClick={onOpen}
      >
        Edit Profile
      </button>

      <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={"#000"} textColor={"#fff"} >
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={'relative'}
            top={0}
          >
            <Tooltip label='Close' openDelay={300} placement="bottom" className="bg-gray-800 text-white rounded-md p-2">
              <button
                onClick={onClose}
                className="mr-1 hover:bg-gray-800 rounded-full w-12 h-12"
              >
                <span className="text-xl">X</span>
              </button>
            </Tooltip>

            <h4 className="text-white">Edit Profile</h4>
            <Button className="bg-white" color="green" onClick={onClose}>
              <span className="text-black font-semibold">Save</span>
            </Button>
          </ModalHeader>
          <ModalBody>
            <img
              className="w-full h-[220px]"
              src="https://pbs.twimg.com/profile_banners/1114918867556499458/1716139798/600x200"
              alt=""
            />
            <img
              src="/prof-image.jpg"
              alt=""
              className="w-32 h-32 absolute top-[35%] left-10 rounded-full border-[5px] border-black"
            />
            <div className="flex flex-col w-full mt-24 pb-4 gap-6">
              <h5 className="text-white">Your Name</h5>
              <input
                className="p-4 rounded-xl w-[80%] text-white placeholder:text-white bg-transparent border-slate-500 border-[1px]"
                type="text"
                placeholder="username"
              />
              <h5 className="text-white">Bio</h5>
              <input
                id="bio"
                className="p-4 rounded-xl text-white placeholder:text-white w-[80%] bg-transparent active:bg-transparent border-slate-500 border-[1px]"
                type="text"
                placeholder="Bio"
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProfile;
