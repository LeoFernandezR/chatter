import LogoutButton from "../LogoutButton";

import useAuthStore from "@/store/auth";

type Props = {};

const NavbarFooter = ({}: Props) => {
  const user = useAuthStore((state) => state.user);

  return (
    <footer className="flex items-center justify-between pt-2">
      <p>
        Hi <span className="text-baby-blue-500">{user?.username}</span> 👋
      </p>
      <LogoutButton />
    </footer>
  );
};

export default NavbarFooter;
