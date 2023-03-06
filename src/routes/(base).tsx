import { Suspense, type VoidComponent } from "solid-js";
import { Outlet } from "solid-start";
import Footer from "~/layouts/components/Footer";
import Header from "~/layouts/components/Header";

const Layout: VoidComponent = () => {
  return (
    <>
      <Header />
      <main class="min-h-auto">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
