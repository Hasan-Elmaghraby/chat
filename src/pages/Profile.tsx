import { useUsersContext } from "../hooks/use-users";
import { Loader } from "../shared/components/Loader";

const Profile = () => {
  const { currentUser, loading } = useUsersContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">No user found. Please sign in.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-500 px-6">
      <div
        className="w-full max-w-xl  rounded-2xl shadow  bg-gray-200  p-6 lg:p-12
        sm:p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-500 border-b-2 pb-2 w-fit mx-auto">
          Profile
        </h1>

        <div className="space-y-5 ">
          <div
            className="flex  flex-col space-y-1  border-b-2 pb-2
           border-grey-300"
          >
            <p className="text-lg text-gray-500">Name</p>
            <p className="text-2xl font-medium text-gray-900">
              {currentUser.name || "—"}
            </p>
          </div>

          <div className="flex  flex-col space-y-1 ">
            <p className="text-lg text-gray-500">Email</p>
            <p className="text-2xl font-medium text-gray-900">
              {currentUser.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
