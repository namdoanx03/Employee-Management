// title, color, kich thuoc

type PropTypes = {
    title:string;
    type:"primary" | "danger" | "warning";
    size:"sm" | "lg";
}
const BTN_PRIMARY = "primary"
const BTN_DANGER = "danger"
const BTN_WARNING = "warning";
const BTN_SUCCESS = "success";

const BTN_LARGE = "lg"
const BTN_SMALL = "sm"
export default function Button({title, type, size} : PropTypes){
    return (
    <>
      <button 
      className={`btn btn-${
        type === BTN_PRIMARY 
            ? BTN_PRIMARY 
            : type === BTN_DANGER 
            ? BTN_DANGER 
            : type === BTN_WARNING
            ? BTN_WARNING 
            : BTN_SUCCESS 
    } btn-${size === BTN_LARGE ? BTN_LARGE : BTN_SMALL}`}
    >
    {title}
    </button>
    </>
  );
}
