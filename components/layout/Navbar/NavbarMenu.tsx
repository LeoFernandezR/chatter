import useRooms from "../../../hooks/useRooms";
import NewRoomButton from "../../NewRoomButton";

type Props = {};

const NavbarMenu = ({}: Props) => {
  const {rooms} = useRooms();

  return (
    <nav className="flex flex-col flex-1 gap-1 overflow-auto">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Rooms:</h3>
        <NewRoomButton />
      </div>
      <ul className="flex-1 mr-1 overflow-y-auto">
        {Array(40)
          .fill({name: "typescript"})
          .map((room: {name: string}) => (
            <li key={room.name}>{room.name}</li>
          ))}
      </ul>
    </nav>
  );
};

export default NavbarMenu;
