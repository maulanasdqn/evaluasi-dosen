"use client";
import { FC, Fragment, ReactElement, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { Typography } from "./typography";

export type TModal = {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
};

export const Modal: FC<TModal> = (props): ReactElement => {
  useEffect(() => {
    if (props.isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "scroll";
    }

    return () => {
      document.documentElement.style.overflow = "scroll";
    };
  }, [props?.isOpen]);
  return (
    <Fragment>
      {props?.isOpen &&
        createPortal(
          <section className="fixed h-screen top-0 left-0 right-0 bottom-0 bg-grey-200/80 bg-blur z-50 flex justify-center items-center">
            <div className="bg-white transition-all duration-300 ease-in-out w-fit shadow rounded-lg h-auto">
              <div className="flex justify-between w-full items-center bg-success-700 p-4 rounded-t-lg">
                <Typography color="text-white" size="body-1" variant="bold">
                  {props.title}
                </Typography>
                {props.onClose && (
                  <IoMdClose
                    data-testid="close-button"
                    className="cursor-pointer text-white"
                    onClick={props.onClose}
                    size={20}
                  />
                )}
              </div>
              <div
                style={{
                  width: props.width,
                  height: props.height,
                }}
                className="p-4"
              >
                {props.children}
              </div>
            </div>
          </section>,
          document.body,
        )}
    </Fragment>
  );
};
