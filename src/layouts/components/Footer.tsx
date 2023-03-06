import type { VoidComponent } from "solid-js";
import { BiRegularLinkExternal } from "solid-icons/bi";
import { BsGithub } from "solid-icons/bs";

const Footer: VoidComponent = () => {
  return (
    <footer class="fixed bottom-0 my-6 w-full">
      <section class="container px-4 md:px-0 mx-auto flex items-center justify-between">
        <article class="flex items-center space-x-1">
          <p class="text-secondary">⚡ Made by Joseph using</p>
          <div class="flex items-center space-x-1 link-secondary">
            <a href="https://start.solidjs.com/" rel="noreferrer">
              Solid Start
            </a>
            <BiRegularLinkExternal size={12} />
          </div>
        </article>
        <a href="https://github.com/Jcanotorr06" target="_blank" rel="noreferrer" class="link-secondary">
          <BsGithub size={18} class="transition-colors duration-100 hover:text-primary" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
