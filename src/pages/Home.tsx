import { Link } from "react-router";

const Home = () => {
  return (
    <main>
      <div className="p-4 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Hello guys</h1>
        <p className="my-4">This is the home page</p>
        <p className="my-4">Please sign up to continue</p>
        <p className="my-4">Have a nice day</p>
        <div>
          <Link
            to="/sign-in"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            sign in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
