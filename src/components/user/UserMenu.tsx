"use client";

import { LogOut, User, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/libs/hooks";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/features/Auth/AuthenticationSlice";
import Cookies from "js-cookie";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import Link from "next/link";
import AuthService from "@/services/authService";
import { RiLockPasswordLine } from "react-icons/ri";
type UserMenuProps = {
  showName?: boolean;
};

const UserMenu = ({ showName = false }: UserMenuProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.authentication);
  const userImg = user ? user.avatar.url : "/assets/img/userIcon.png";

  const handleLogout = async () => {
    const response = await AuthService.logout();

    if (response.status === 200) {
      toast.success(response.data.message);
      dispatch(logoutUser());
      router.push("/login");
      Cookies.set("LogedIn", "");
    } else {
      toast.error(response);
      router.push("/");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2">
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={userImg} alt={user?.name} />
            </Avatar>
            {showName && (
              <div className="flex-col hidden hover:cursor-pointer md:flex">
                <h2 className="text-base font-semibold">{user?.name}</h2>
                <h3 className="text-xs font-semibold">{user?.email}</h3>
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem className="hover:cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
            </Link>
            {user?.role === "admin" && (
              <Link href="/dashboard">
                <DropdownMenuItem className="hover:cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  DashBoard
                </DropdownMenuItem>
              </Link>
            )}
            <Link href="/password">
              <DropdownMenuItem className="hover:cursor-pointer">
                <RiLockPasswordLine className="w-4 h-4 mr-2" />
                Change Password
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="hover:cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
