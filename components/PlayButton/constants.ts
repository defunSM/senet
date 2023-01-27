// default settings for the shapes in the playbutton
const transition: any = {
  type: "spring",
  duration: 0.7,
  bounce: 0.2
};

const spring = { stiffness: 600, damping: 30 };
const mouseToLightRotation = (v: any) => (-1 * v) / 140;

const setting = {
  TRANSITION: transition,
  SPRING: spring,
  MOUSE_TO_LIGHT_ROTATION: mouseToLightRotation,
}

export default setting;
