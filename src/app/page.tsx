"use client";
import { LanguageToggle } from "./components/LanguageToggle";
import { ModeToggle } from "./components/ModeToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Example() {
    const { t } = useLanguage();
    return (
        <div className="p-4">
            <h1 className="font-bold underline text-4xl text-dark-accent dark:text-light-primary">
                {t("hello")}
            </h1>
            <button className="hover:cursor-pointer text-3xl bg-light-primary dark:bg-dark-accent dark:text-sm">
                Click Me
            </button>
            <div className="bg-white dark:bg-black text-black dark:text-white">
                Hello
            </div>

            <button className="bg-blue-500 dark:bg-red-500">click meee</button>
            <ModeToggle />
            <LanguageToggle />
        </div>
    );
}
