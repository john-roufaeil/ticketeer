'use client';
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            toastOptions={{
                className: "bg-light-surface dark:bg-dark-surface border border-border shadow",
                style: {
                    color: "var(--popover-foreground)",
                    borderColor: "var(--border)",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
