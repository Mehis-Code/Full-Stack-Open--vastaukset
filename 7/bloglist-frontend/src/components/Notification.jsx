import { useSelector } from "react-redux";

const Notification = () => {
  const getStateofNoti = useSelector((state) => state.notification);

  if (!getStateofNoti.message) {
    return;
  }
  let chooseColor;
  const check = getStateofNoti.type;
  if (check == "info") {
    chooseColor = "green";
  } else {
    chooseColor = "red";
  }
  const style = {
    fontSize: 18,
    borderStyle: "solid",
    color: chooseColor,
    background: "white",
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  };

  return <div style={style}>{getStateofNoti.message}</div>;
};

export default Notification;
