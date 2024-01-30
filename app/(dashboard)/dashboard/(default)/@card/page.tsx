const DashboardCardPage = () => {
  return (
    <div className="flex gap-x-2 w-full">
      <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
        <h1 className="font-bold">Total Fakultas</h1>
        <p>7</p>
      </div>
      <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
        <h1 className="font-bold">Total Prodi</h1>
        <p>21</p>
      </div>
      <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
        <h1 className="font-bold">Jumlah Dosen</h1>
        <p>216</p>
      </div>
      <div className="flex flex-col gap-y-2 justify-center px-4 bg-grey-50 shadow-md rounded-lg w-1/4 h-[130px] text-black">
        <h1 className="font-bold">Jumlah Mahasiswa</h1>
        <p>1856</p>
      </div>
    </div>
  );
};

export default DashboardCardPage;
