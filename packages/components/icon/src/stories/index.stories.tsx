import { Icon, Icons, IconsKeys } from "@formas/icon";
import { define } from "@atomico/storybook";

export default {
    title: "Components/Icon",
    ...define(Icon),
};

export const Default = (props) => (
    <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));--size-icon: 20px">
        {Object.keys(Icons).map((type: IconsKeys) => (
            <Icon title={type} {...props} type={type}></Icon>
        ))}
    </div>
);
