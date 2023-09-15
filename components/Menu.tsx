import Link from "next/link";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export default function Menu({
  onSectionChange,
  menuOpened,
  setMenuOpened,
}: {
  onSectionChange: Dispatch<SetStateAction<number>>;
  menuOpened: boolean;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-12 right-12 p-3 bg-white w-11 h-11 rounded-md"
      >
        <div
          className={`bg-black h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45 translate-y-0.5" : ""
          }`}
        ></div>
        <div
          className={`bg-black h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        ></div>
        <div
          className={`bg-black h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        ></div>
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col ${
          menuOpened ? "w-80" : "w-0"
        }`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          <MenuBotton label="About" onClick={() => onSectionChange(0)} />
          <MenuBotton label="Features" onClick={() => onSectionChange(1)} />
          <MenuBotton label="How It Works" onClick={() => onSectionChange(2)} />
          <button className="text-2xl font-bold cursosr-pointer hover:text-indigo-600 transition-colors">
            <Link href="/api/auth/signin">Sign In</Link>
          </button>
        </div>
      </div>
    </>
  );
}

const MenuBotton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursosr-pointer hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};
