"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import { socket } from "@/utils/socketio/socket";
import { useRouter } from "next/navigation";

type NotificationType = {
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "repost" | "follow";
  link: string;
};

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data: NotificationType) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  const router = useRouter();

  const reset = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = (notification: NotificationType) => {
    const filteredList = notifications.filter((n) => n.id !== notification.id);
    setNotifications(filteredList);
    setOpen(false);
    router.push(notification.link);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-4 p-2 rounded-full hover:bg-hoverMenuItem cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative">
          <OptimizedImage
            src={`/icons/notification.svg`}
            alt=""
            width={24}
            height={24}
          />
          {notifications.length > 0 && (
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-iconBlue p-2 rounded-full flex items-center justify-center text-sm">
              {notifications.length}
            </div>
          )}
        </div>
        <span className="hidden xxl:inline">Nofitications</span>
      </div>

      {open && (
        <div className="absolute -right-full p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-max">
          <h1 className="text-xl text-textGray">Notifications</h1>
          {notifications.map((n) => (
            <div
              className="cursor-pointer"
              key={n.id}
              onClick={() => handleClick(n)}
            >
              <strong>{n.senderUsername}</strong>{" "}
              {n.type === "like"
                ? "liked your post"
                : n.type === "repost"
                ? "reposted your post"
                : n.type === "comment"
                ? "replied to your post"
                : "followed you"}
            </div>
          ))}
          {notifications.length > 0 && (
            <button
              onClick={reset}
              className="bg-black text-white p-2 text-sm rounded-lg cursor-pointer"
            >
              Mark as read
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
