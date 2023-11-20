"use client";
import { useEffect, useState } from "react";

// Import components
import {
  Container,
  EditProfile,
  Loading,
  PaginationComponent,
  Protected,
} from "@/components";

// Import Lottie animation
import Lottie from "lottie-react";
import animationData from "@/constants/lottie/verifiedTick.json";

// Import Redux related stuff
import { useAppSelector } from "@/redux/libs/hooks";

// Import NextJS Image
import Image from "next/image";

// Import utility functions and constants
import { dummyProfileDescription } from "@/constants";
import { showReviewItems } from "@/utils/showReviewItems";

// Import icons from respective packages
import { FiEdit } from "react-icons/fi";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

// Import services and validators
import UserService from "@/services/userService";
import { UserProfile, userProfileSchema } from "@/validator/profile";

// Import types
import { UserType } from "@/types/Auth/authentication";

// Import toast
import toast from "react-hot-toast";

const Profile = () => {
  const { user, loading } = useAppSelector((state) => state.authentication);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      if (user?.role !== "admin") return;
      const response = await UserService.getAllUsers();
      if (response.status === 200) {
        const {
          data: { users },
        } = response;
        const validUsers = userProfileSchema.array().safeParse(users);
        if (!validUsers.success) return toast.error("Users Data is not valid");
        setAllUsers(validUsers.data);
      }
    };

    getUsers();
  }, [user?.role]);

  const validUserData = userProfileSchema.safeParse(user);
  const userData = validUserData.success && validUserData.data;

  return loading ? (
    <Loading />
  ) : (
    <Container className="w-full px-1 mx-auto lg:w-11/12">
      <div className="my-10 profile-grid">
        {/* IMAGE  */}
        <div className="relative w-full h-full col-start-1 col-end-2 row-start-1 row-end-3 shadow-2xl">
          <Image
            src="/assets/img/profile_cover.avif"
            alt="Cover photo"
            fill
            priority
            className="object-cover object-center rounded-xl"
          />
          {/* OVERLAY */}
          <div className="absolute z-10 w-full h-full bg-blue-700/20 rounded-xl" />
        </div>

        {userData && (
          <div className="z-10 grid justify-between h-full grid-cols-1 col-start-1 col-end-2 row-start-2 row-end-4 p-5 mx-2 bg-white shadow-2xl lg:mx-5 rounded-xl lg:grid-cols-2 gap-x-20">
            {/* PROFILE */}
            <UserProfile userData={userData} user={user as UserType} />

            {/* USERS DATA */}
            {userData?.role === "admin" && allUsers.length > 0 && (
              <UsersData
                allUsers={allUsers}
                page={page}
                resultPerPage={6}
                setPage={setPage}
              />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

type UserProfileProps = {
  userData: UserProfile;
  user: UserType;
};
const UserProfile = ({ userData, user }: UserProfileProps) => {
  return (
    <div className="border-b-[2px] border-gray-500 lg:border-none">
      <div className="relative flex items-center gap-5 rounded-lg">
        <Image
          src={userData.avatar.url}
          width={72}
          height={72}
          alt={userData.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg shadow-2xl"
        />
        <div className="flex flex-col items-start justify-start ">
          <h2 className="font-semibold">{userData.name}</h2>

          {user?.role === "admin" ? (
            <Lottie
              animationData={animationData}
              className="w-12 h-12"
              loop={true}
            />
          ) : (
            <h3 className="">{userData.role}</h3>
          )}
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col gap-2 py-5 border-b-[2px] border-gray-500">
          <h2 className="font-semibold">Profile Description</h2>
          <p className="text-sm lg:w-9/12 lg:text-base">
            {user?.description ? user?.description : dummyProfileDescription}
          </p>
        </div>
        <EditProfile />
      </div>
      <div className="flex flex-col gap-2 my-5 text-xs md:text-base sm:text-lg">
        <div className="flex items-center gap-2">
          <AiOutlineUser className="md:hidden" />
          <label className="hidden font-semibold md:inline-block">Name:</label>
          <p className="font-semibold text-gray-600 ">{user?.name}</p>
        </div>
        {userData.mobileNo && (
          <div className="flex items-center gap-2">
            <BiPhone className="md:hidden" />
            <label className="hidden font-semibold md:inline-block">
              Mobile Number:
            </label>
            <p className="font-semibold text-gray-600">{userData.mobileNo}</p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <AiOutlineMail className="md:hidden" />
          <label className="hidden font-semibold md:inline-block">Email:</label>
          <p className="font-semibold text-gray-600">{userData?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineLocationMarker className="md:hidden" />
          <label className="hidden font-semibold md:inline-block">
            Location:
          </label>
          <p className="font-semibold text-gray-600">Pakistan </p>
        </div>
      </div>
      <div className="my-10 ">
        <h2></h2>
      </div>
    </div>
  );
};

type UsersDataProps = {
  allUsers: UserProfile[];
  page: number;
  resultPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const UsersData = ({
  allUsers,
  page,
  resultPerPage,
  setPage,
}: UsersDataProps) => {
  return (
    <div className="mt-10 lg:p-5 lg:mt-0">
      <h2 className="mb-5 text-2xl font-semibold lg:text-center">
        Available Users
      </h2>
      <div className="flex flex-col gap-5">
        {allUsers.map(
          (user, index) =>
            showReviewItems(
              index,
              page,
              resultPerPage,
              allUsers.length > resultPerPage
            ) && (
              <div
                className="relative flex flex-col items-start gap-5 text-sm  rounded-lg md:items-center lg:flex-row lg:text-base "
                key={user.email}
              >
                <Image
                  src={user.avatar.url}
                  width={72}
                  height={72}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="User Profile "
                  className="self-start rounded-lg shadow-2xl"
                />
                <div className="flex flex-col w-11/12 break-words full md:w-10/12 ">
                  <h2 className="font-semibold sm:text-base">{user.name}</h2>
                  <h3 className="w-full text-gray-500 ">{user.email}</h3>
                  <h3 className="text-gray-500">{user.role}</h3>
                </div>
              </div>
            )
        )}
      </div>

      {/*SHOW PAGINATION */}
      {allUsers.length > resultPerPage && (
        <div className="my-10 ">
          <PaginationComponent
            count={allUsers.length}
            page={page}
            setPage={setPage}
            resultsPerPage={resultPerPage}
          />
        </div>
      )}
    </div>
  );
};
export default Protected(Profile);
