import { Link } from "react-router";
import logo from "../../public/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-4 md:w-[737px] md:p-0">
        <img src={logo} alt="" />

        {user ? (
          <p className="text-white">{user?.name}</p>
        ) : (
          <Link to="/login">
            <div className="flex h-[35px] w-[130px] cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
