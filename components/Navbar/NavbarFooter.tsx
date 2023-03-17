import {useAuth} from "../../context/AuthContext";
import LogoutButton from "../LogoutButton";

type Props = {};

const NavbarFooter = ({}: Props) => {
  const {user} = useAuth();

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
