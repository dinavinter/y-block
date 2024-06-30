import { Container } from "@formas/container";
import { Checkbox } from "@formas/checkbox";
import { define } from "@atomico/storybook";

export default {
    title: "components/Container",
    ...define(Container),
    args: {
        padding: "l",
        shadow: 1,
    },
};

export const Default = (props) => <Container {...props}>Atomico!</Container>;
export const DefaultWithCheckbox = (props) => (
    <Container {...props}>
        Atomico!
        <Checkbox></Checkbox>
    </Container>
);
