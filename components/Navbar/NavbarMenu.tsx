import Link from "next/link";

import useRooms from "../../hooks/useRooms";
import NewRoomButton from "../NewRoomButton";

type Props = {};

const NavbarMenu = ({}: Props) => {
  const {rooms} = useRooms();

  return (
    <nav className="flex flex-col flex-1 gap-1 overflow-y-auto">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Rooms:</h3>
        <NewRoomButton />
      </div>
      <ul className="flex-1 mr-1 overflow-y-auto">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="w-full py-1 text-sm font-light transition-colors hover:bg-orchid-crayola-300/20"
          >
            <Link className="block w-full" href={`/chat/${room.name}`}>
              # {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarMenu;
