import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Ensure this is correct

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return <p className="text-red-500">❌ Access Denied. Please <a href="/login">Login</a></p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Welcome, {session.user.name}!</h2>
      <p className="text-gray-700">This is your secure dashboard.</p>
      <a href="/api/auth/signout" className="px-4 py-2 bg-red-500 text-white rounded mt-4">
        Logout
      </a>
    </div>
  );
}
