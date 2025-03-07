import { TsWorker } from "@atomico/ts-worker";
import { define } from "@atomico/storybook";

export default {
    title: "components/ts-worker",
    ...define(
        TsWorker,
        { // Optional
            argTypes: {
                color: {
                    description: "Description..."
                }
            }
        }
)
};

export const Story = (props) =><TsWorker {...props}>Atomico!</TsWorker>;