// import { notification1 } from "../assets";
import { notificationImages } from "../constants";
import Lottie from "lottie-react";
import notificationAnim from "../assets/notification/image-1.json";
import { motion } from "framer-motion";

const Notification = ({ className, title }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5`}
    >
      <Lottie
        animationData={notificationAnim}
        loop
        autoplay
        className="w-[80px] h-[80px] rounded-xl"
      />
      <div className="flex-1">
        <h6 className="mb-1 font-semibold text-base">{title}</h6>

        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
            {notificationImages.map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden"
              >
                <img src={item} alt={`image-${i}`} className="w-full" width={20} height={20} />
              </motion.li>
            ))}
          </ul>
          <div className="body-2 text-n-13">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
