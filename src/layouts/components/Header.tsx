import { Suspense, type VoidComponent } from "solid-js";
import { A } from "solid-start";
import { BsGithub } from "solid-icons/bs";
import Auth from "~/components/Auth";

const Header: VoidComponent = () => {
  return (
    <header class="sticky top-0 z-40 w-full py-4 duration-300">
      <section class="flex container px-4 md:px-0 items-center justify-between mx-auto">
        <A href="/">
          <div class="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all">
            <h1 class="textlxl mx-2">Slug</h1>
          </div>
        </A>
        <article class="flex items-center space-x-6">
          <Suspense>
            <Auth />
          </Suspense>
          <a href="https://github.com/Jcanotorr06/slug" target="_blank" rel="noreferrer">
            <button class="btn btn-circle btn-ghost btn-sm">
              <BsGithub size={20} />
            </button>
          </a>
        </article>
      </section>
    </header>
  );
};

export default Header;
