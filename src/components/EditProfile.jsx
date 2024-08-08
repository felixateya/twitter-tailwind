import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

function EditProfile() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <button
        onClick={handleOpen}
        className="border-[1px] border-gray-600 py-2 px-4 rounded-full absolute mt-4 right-6 font-semibold"
      >
        Edit Profile
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        size={"sm"}
        className="bg-black text-white w-1/2 h-3/4 overflow-auto"
      >
        <DialogHeader className="flex justify-between px-4">
          <button
            title="Close"
            onClick={handleOpen}
            className="mr-1 hover:bg-gray-800 rounded-full w-12 h-12"
          >
            <span className="text-xl">X</span>
          </button>

          <h4>Edit Profile</h4>
          <Button
            className="bg-white"
            color="green"
            classNameonClick={handleOpen}
          >
            <span className="text-black font-semibold">Save</span>
          </Button>
        </DialogHeader>
        <DialogBody className="relative h-full">
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
            <Typography type="h5">Your Name</Typography>
            <input
              className="p-4 rounded-xl w-[80%] text-white placeholder:text-white bg-transparent border-slate-500 border-[1px]"
              type="text"
              placeholder="username"
            />
            <Typography type="h5">Bio</Typography>
            <input
              id="bio"
              className="p-4 rounded-xl text-white placeholder:text-white w-[80%] bg-transparent active:bg-transparent border-slate-500 border-[1px]"
              type="text"
              placeholder="Bio"
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default EditProfile;
