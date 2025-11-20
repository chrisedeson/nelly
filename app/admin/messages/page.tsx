import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function MessagesPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/admin/login");
  }

  const { rows: messages } = await sql`
    SELECT id, name, email, mobile, message, created_at 
    FROM contact_messages 
    ORDER BY created_at DESC
  `;

  return (
    <div className="min-h-screen bg-[#080808]">
      <nav className="bg-[#1b1b1b] border-b border-[#484848] px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[24px] font-extrabold text-white font-['Raleway']">
            Contact Messages
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-[#3f8e00] font-['IBM_Plex_Mono'] text-[14px] hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-8 text-center">
            <p className="text-[#9c9c9c] font-['IBM_Plex_Mono'] text-[14px]">
              No messages yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-white font-['Raleway']">
                      {message.name}
                    </h3>
                    <div className="flex gap-4 mt-1">
                      <a
                        href={`mailto:${message.email}`}
                        className="text-[#3f8e00] font-['IBM_Plex_Mono'] text-[12px] hover:underline"
                      >
                        {message.email}
                      </a>
                      {message.mobile && (
                        <a
                          href={`tel:${message.mobile}`}
                          className="text-[#3f8e00] font-['IBM_Plex_Mono'] text-[12px] hover:underline"
                        >
                          {message.mobile}
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-[#9c9c9c] font-['IBM_Plex_Mono'] text-[10px]">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-[14px] text-white font-['IBM_Plex_Mono'] whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
