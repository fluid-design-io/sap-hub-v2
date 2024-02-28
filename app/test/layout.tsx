import React from "react";

function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
      <div id='modal-root' />
    </>
  );
}

export default Layout;
