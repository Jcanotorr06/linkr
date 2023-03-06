import { type VoidComponent } from "solid-js";
import { A } from "solid-start";
//import { trpc } from "~/utils/trpc";
import { Up } from "~/components";
import { BiRegularRocket, BiRegularStar } from "solid-icons/bi";

const Home: VoidComponent = () => {
  //const hello = trpc.example.hello.useQuery(() => ({ name: "from tRPC" }));
  return (
    <section class="flex flex-col items-center justify-center py-20 bg-gradient-to-r transition-all duration-100">
      <Up>
        <h1 class="text-3xl md:text-6xl mb-2 md:mb-5">Open Source Link Shortener</h1>
      </Up>
      <Up delay={200}>
        <h3 class="text-2xl mb-6 text-secondary">unlimited links & custom slugs</h3>
      </Up>
      <Up delay={400}>
        <div class="flex">
          <A href="/dash" class="flex items-center hover:text-white duration-200 transition-colors ml-6">
            <BiRegularRocket class="mr-2" />
            Getting Started
          </A>
          <a
            href="https://github.com/Jcanotorr06/linkr"
            target="_blank"
            rel="noreferrer"
            class="flex items-center hover:text-white duration-200 transition-colors ml-6"
          >
            <BiRegularStar class="mr-2" />
            Star on GitHub
          </a>
        </div>
      </Up>
    </section>
  );
};

export default Home;
