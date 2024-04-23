import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="mx-auto">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div className="lg:w-1/2 lg:pr-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Welcome to Real Estate 🦑
            </h1>
            <p className="text-gray-500 leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <SignIn path="/sign-in" />
          </div>
          <div className="hidden lg:block lg:w-1/2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
