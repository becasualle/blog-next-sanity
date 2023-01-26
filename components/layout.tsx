import { Alert, Footer, Meta } from "./index";
import { ReactNode } from "react";

type Props = {
  preview: boolean;
  children: ReactNode;
};

export default function Layout({ preview, children }: Props) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  );
}
