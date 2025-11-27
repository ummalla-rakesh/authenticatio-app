"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export default function AuthCallbackHandler() {
  const router = useRouter();
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    const search = window.location.search;
    // Supabase (OAuth) uses `code` or `access_token` in the URL for redirects
    if (!search.includes("code=")) return;

    // Avoid running multiple times
    if (handled) return;

    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const supabase: SupabaseClient<any, "public", "public", any, any> =
          createClient();

        // Exchange the code in the URL for a session. This finalizes the
        // OAuth flow in the browser (client-side).
        // `getSessionFromUrl` will remove OAuth params from the URL hash so we
        // can safely continue.
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (data.session) {
          // If we have tokens we should persist them server-side so SSR pages
          // immediately see the authenticated session. POST tokens to
          // /api/auth/session which will set HttpOnly cookies using
          // `createServerClient`.
          const access_token = data.session.access_token;
          const refresh_token = data.session.refresh_token;
          if (access_token && refresh_token) {
            const res = await fetch("/api/auth/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "same-origin",
              body: JSON.stringify({ access_token, refresh_token }),
            });

            if (res.ok) {
              // Session cookies are set on the response. Now navigate to
              // the protected route.
              router.replace("/protected");
              setHandled(true);
              return;
            }
          }
        }

        // No session created or server route failed, remove query params.
        router.replace(window.location.pathname);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // On error, clear query params so user can try again and report if
        // needed.
        router.replace(window.location.pathname);
      }
    })();
  }, [handled, router]);

  return null;
}
