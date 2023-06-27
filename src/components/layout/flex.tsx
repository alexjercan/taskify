import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { mergeProps } from "solid-js";

import { cn } from "~/lib/utils";

type JustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly"
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch"
type FlexDirection = "row" | "col" | "row-reverse" | "col-reverse"

export interface FlexProps extends JSX.HTMLAttributes<HTMLDivElement> {
  flexDirection?: FlexDirection
  justifyContent?: JustifyContent
  alignItems?: AlignItems
}

const Flex: Component<FlexProps> = (rawProps) => {
    // TODO: still looking for a cleaner way to do this in solidjs
    const props = mergeProps(
        {
            flexDirection: "row" as FlexDirection,
            justifyContent: "between" as JustifyContent,
            alignItems: "center" as AlignItems
        },
        rawProps
    );
    const [, rest] = splitProps(props, ["flexDirection", "justifyContent", "alignItems", "class"]);

    return (
        <div
            class={cn(
                "flex w-full",
                flexDirectionClassNames[props.flexDirection],
                justifyContentClassNames[props.justifyContent],
                alignItemsClassNames[props.alignItems],
                props.class
            )}
            {...rest}
        />
    );
};

export { Flex };

const justifyContentClassNames: { [key in JustifyContent]: string } = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
};

const alignItemsClassNames: { [key in AlignItems]: string } = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch"
};

const flexDirectionClassNames: { [key in FlexDirection]: string } = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse"
};
