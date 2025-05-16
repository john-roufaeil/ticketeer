import { ModeToggle } from "./components/ModeToggle";
export default function Example() {
    return (
        <div className="p-4">
            <h1 className="font-bold underline text-4xl text-dark-accent dark:text-light-primary">
                Hello world!
            </h1>
            <button className="hover:cursor-pointer text-3xl bg-light-primary dark:bg-dark-accent dark:text-sm">
                Click Me
            </button>
            <div className="bg-white dark:bg-black text-black dark:text-white">
                Hello
            </div>

            <button className="bg-blue-500 dark:bg-red-500">click meee</button>
            <ModeToggle />
        </div>
    );
}
