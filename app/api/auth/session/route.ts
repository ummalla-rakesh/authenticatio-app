import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { access_token, refresh_token } = await request.json();

    if (!access_token || !refresh_token) {
      return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
    }

    const supabase = await createClient();

    // `setSession` will set the HttpOnly cookies using the configured
    // server-side cookie store so server-side rendering sees the authenticated
    // user on subsequent requests.
    const { error } = await (supabase.auth).setSession({
      access_token,
      refresh_token,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
