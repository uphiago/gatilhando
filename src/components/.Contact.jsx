import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
// import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Backdrop, Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { motion } from "framer-motion";
import * as React from "react";

const actions = [
  // {
  //   icon: <InstagramIcon size={26} />,
  //   link: "https://instagram.com/Dotmindlabs",
  // },
  {
    icon: <TelegramIcon size={26} />,
    link: "https://t.me/Dotmindlabs",
  },
];

export default function Contact() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} sx={{ zIndex: 10 }} />
      <Box sx={{ position: "fixed", bottom: 50, right: 50, zIndex: 20 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <SpeedDial
            ariaLabel="Contact"
            icon={
              <SpeedDialIcon
                icon={
                  <EmailRoundedIcon
                    sx={{ color: "#000000" }} // azul
                  />
                }
                openIcon={<DraftsRoundedIcon sx={{ color: "#000000" }} />}
              />
            }
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="up"
            FabProps={{
              sx: {
                bgcolor: "white",
                border: "1px solid #000000",
                color: "#000000",
                "&:hover": {
                  bgcolor: "#f0f8ff",
                },
              },
            }}
          >
            {actions.map((action, idx) => (
              <SpeedDialAction
                key={idx}
                icon={action.icon}
                onClick={() => {
                  window.open(action.link, "_blank");
                  handleClose();
                }}
                sx={{
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "#e3f2fd",
                  },
                }}
              />
            ))}
          </SpeedDial>
        </motion.div>
      </Box>
    </>
  );
}
