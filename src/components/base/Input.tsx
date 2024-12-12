type PropTypes = {
    type: "text" | "data" | "email" | "password";
    placeholder: string;
    style: any;
    onChange: () =>  void
}

export default function Input({type, placeholder, style, onChange}: PropTypes) {
  return (
    <>
      <input
        onChange={onChange}
        style={style}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
    </>
  );
}
