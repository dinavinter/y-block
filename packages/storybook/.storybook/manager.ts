import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const theme = create({
    base: "light",
    brandTitle: "YJS Elements",
    brandUrl: "/",
    brandImage: "/logo-formas.svg",
    brandTarget: "_self",
});

addons.setConfig({
    theme: theme,
});
