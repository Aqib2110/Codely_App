import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Projects from "../components/Projects";
import { cookies } from "next/headers";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-center text-red-500 mt-8">Please log in to see your projects</div>;
  }

  // ✅ Fix: Await cookies() before using .get()
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value || "";

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/myprojects`, {
    cache: "no-store",
    headers: {
      Cookie: `next-auth.session-token=${sessionToken}`,
    },
  });

  if (!res.ok) 
  {
    return <div className="text-red-500 text-center mt-8">Failed to load projects</div>;
  }

  const data = await res.json();
  console.log(data,"aqibdata");
  return <Projects data={data} />;
    // return <Projects data={[]} />;

}
