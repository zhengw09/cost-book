import { ReactElement } from "react";

export type ModalProps = {
    show: boolean;
    children: ReactElement;
}

export default function Modal(props: ModalProps) {
    const showHideClassName = props.show ? "modal d-block" : "modal d-none";
  
    return (
      <div className={showHideClassName}>
        <div className="modal-container">
          {props.children}
        </div>
      </div>
    );
};