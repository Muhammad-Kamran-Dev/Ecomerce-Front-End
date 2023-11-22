import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdUpload } from "react-icons/md";
import { CgChart } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";

const Sidebar = () => {
  const DashboardNavLinks = [
    {
      path: "/dashboard",
      text: "Home",
      icon: <MdDashboard />,
    },

    {
      path: "/users",
      text: "All Users",
      icon: <AiOutlineUser />,
    },

    {
      path: "/addProduct",
      text: "Add Product",
      icon: <MdUpload />,
    },
    {
      path: "/addCategory",
      text: "Add Category",
      icon: <MdUpload />,
    },
    {
      path: "/productData",
      text: "Products",
      icon: <MdProductionQuantityLimits />,
    },
  ];
  return (
    <div className="flex">
      <div className="flex flex-col items-center h-full pt-16 overflow-hidden shadow-2xl text-black/90 md:items-start">
        <div className="">
          <h2 className="hidden mb-2 ml-2 text-xl font-semibold text-black/80 lg:block">
            Dashboard
          </h2>
          <DashboardRoutes DashboardNavLinks={DashboardNavLinks} />
        </div>
      </div>
    </div>
  );
};
type DashboardRoutesProps = {
  path: string;
  text: string;
  icon: React.ReactNode;
};

const DashboardRoutes = ({
  DashboardNavLinks,
}: {
  DashboardNavLinks: DashboardRoutesProps[];
}) => {
  const pathname = usePathname();

  return DashboardNavLinks.map((link) => (
    <div className="px-4 md:px-10" key={link.path}>
      <li key={link.path} className="list-none">
        <Link
          href={link.path}
          className={` list-none text-xl font-bold my-7 py-2 px-4 rounded-md flex items-center gap-2  text-black  transition-colors duration-300 ease-in-out hover:text-blue-500 ${
            pathname === link.path && "md:bg-blue-500/90 md:text-white  "
          }`}
        >
          <span
            className={`${
              pathname === link.path && "text-blue-500 md:text-white"
            }  text-3xl md:text-xl`}
          >
            {link.icon}
          </span>
          <span
            className={`hidden md:block  ${
              pathname === link.path && "text-blue-500 md:text-white"
            }`}
          >
            {link.text}
          </span>
        </Link>
      </li>
    </div>
  ));
};
export default Sidebar;
