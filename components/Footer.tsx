import NextImage from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-20 lg:mt-36 pt-10 lg:pt-16 pb-20 border-t border-gray-200 list-none">
      <div className="w-11/12 mx-auto lg:flex lg:justify-between">
        <div className="mb-10 lg:mb-0">
          <div className="flex items-center">
            <div className="relative h-12 w-12 mr-1">
              <NextImage
                src="/footer-logo.png"
                alt="logo"
                fill
                objectFit="contain"
              />
            </div>
            <h3 className="text-3xl font-semibold pt-1.5 text-gray-800">
              Larnova
            </h3>
          </div>
          <div className="flex gap-6 mt-9 opacity-60">
            <Link href="https://www.instagram.com/larnova_inc" target="_blank">
              <div className="relative h-6 w-6">
                <NextImage
                  src="/instagram.png"
                  alt="Instagram"
                  fill
                  objectFit="contain"
                />
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/company/larnova-inc"
              target="_blank"
            >
              <div className="relative h-6 w-6">
                <NextImage
                  src="/linkedin.png"
                  alt="linkedIn"
                  fill
                  objectFit="contain"
                />
              </div>
            </Link>
            <Link href="https://twitter.com/larnova_inc" target="_blank">
              <div className="relative h-6 w-6">
                <NextImage
                  src="/twitter.png"
                  alt="twitter"
                  fill
                  objectFit="contain"
                />
              </div>
            </Link>
          </div>
          <p className="text-xs text-gray-700 mt-3">
            &copy; {new Date().getFullYear()} Larnova{" "}
          </p>
        </div>
        <div className="text-gray-700 lg:basis-7/12 text-[15px] flex flex-row flex-wrap gap-x-8 lg:gap-x-20 gap-y-10">
          <div className="shrink-0">
            <h3 className="font-bold text-gray-900">Lokolm</h3>
            <Link href="https://lokolm.larnova.co" target="_blank">
              <p>Discover</p>
            </Link>
            <Link href="https://lokolm.larnova.co/contribute" target="_blank">
              <p>Contribute Data</p>
            </Link>
          </div>
          <div className="shrink-0">
            <h3 className="font-bold text-gray-900">Community</h3>
            <Link href="https://laig.larnova.co" target="_blank">
              <p>Larnova AI Group</p>
            </Link>
            <p>Discord</p>
            <p>Github</p>
          </div>
          <div className="shrink-0">
            <h3 className="font-bold text-gray-900">Company</h3>
            <Link href="/about">
              <p>About</p>
            </Link>
            <Link href="/careers">
              <p>Careers</p>
            </Link>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
            <Link href="/privacy">
              <p>Privacy</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
