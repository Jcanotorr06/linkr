import type { ParentComponent } from "solid-js";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout: ParentComponent = props => {
  return (
    <>
      <Header />
      <main class="min-h-auto">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
