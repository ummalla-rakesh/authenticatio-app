"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

export const useUserLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setIsLoggedIn(Boolean(data.session));
      })
      .catch(() => {
        if (mounted) setIsLoggedIn(false);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) setIsLoggedIn(Boolean(session));
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  return isLoggedIn;
};

