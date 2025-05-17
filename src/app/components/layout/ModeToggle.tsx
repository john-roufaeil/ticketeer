"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            variant="outline"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex items-center gap-2 px-4 py-2 border rounded"
        >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
    );
}
