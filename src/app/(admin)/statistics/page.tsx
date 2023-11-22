import UserNav from "./_components/Overview";
import RecentSales from "./_components/RecentSales";

const Chart = () => {
  return (
    <section className="px-2 sm:px-10">
      <div className=" mx-auto my-5">
        <h1 className="text-2xl font-semibold">Products Statistics</h1>
      </div>

      <div className=" flex-grow mx-auto mt-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard Cards */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">1</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Products</h2>
            <p className="text-3xl font-bold">1</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-10 sm:mt-20 ">
        <div className="border border-black/10 shadow-lg p-2 sm:p-5 rounded-md ">
          <div>
            <h2 className="text-2xl font-bold  mb-20">Overview</h2>
          </div>
          <UserNav />
        </div>
        <div className="border border-black/10 shadow-lg p-2 sm:p-5 rounded-md">
          <div>
            <h2 className="text-2xl font-bold mb-20">Recent Sales</h2>
          </div>
          <RecentSales />
        </div>
      </div>
    </section>
  );
};

export default Chart;
