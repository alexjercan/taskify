import { As } from "@kobalte/core";

import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import { IoLaptopOutline, IoMoonOutline, IoSunnyOutline } from "solid-icons/io";

export function ModeToggle() {
    const setTheme = (theme: string) => {
        const root = document.documentElement;
        if (
            theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            theme = "dark";
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <As component={Button} variant="ghost" size="sm" class="w-9 px-0">
                    <IoSunnyOutline class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <IoMoonOutline class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">Toggle theme</span>
                </As>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setTheme("light")}>
                    <IoSunnyOutline class="mr-2 h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme("dark")}>
                    <IoMoonOutline class="mr-2 h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme("system")}>
                    <IoLaptopOutline class="mr-2 h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
