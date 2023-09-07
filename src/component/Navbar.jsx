import React from "react";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useCart } from "react-use-cart";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Products", href: "/product", current: false },
];
const cartNavigation = [{ name: "Cart", href: "/cart", current: false }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { isEmpty, totalItems } = useCart();
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full ">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center">
                  <div className="w-full flex items-center">
                    <div className="flex-shrink-0">
                      <a href="/">
                        <img
                          className="h-8 w-8"
                          src="logo192.png"
                          alt="Your Company"
                        />
                      </a>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4 mr-2">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className=" hover:bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className=" md:block">
                    <div className="flex  md:ml-6 ">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <a href={cartNavigation[0].href}>
                          <HiOutlineShoppingCart
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          {!isEmpty && (
                            <span className="absolute right-0 top-0 rounded-full bg-indigo-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                              {totalItems}
                            </span>
                          )}
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Ecom Store
              </h1>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
