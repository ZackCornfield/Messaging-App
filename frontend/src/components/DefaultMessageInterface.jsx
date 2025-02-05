import logo from "../assets/images/logo-blue.svg";

const DefaultMessageInterface = () => {
  return (
    <section className="z-[-2] hidden h-screen w-[60%] items-center justify-center bg-primaryGray md:flex xmd:w-[calc(75%-96px)] xl:w-[75%]">
      <div className="mx-6 flex flex-col items-center justify-center gap-5 border-[2px] border-teal-600 bg-white px-6 py-12 shadow-xl">
        <img src={logo} className="max-w-xs max-h-xs" alt="Logo" />

        <h2 className="text-center text-3xl font-medium">
          Welcome to the Messaging App!
        </h2>
      </div>
    </section>
  );
};

export default DefaultMessageInterface;
