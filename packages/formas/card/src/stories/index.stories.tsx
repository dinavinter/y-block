import { define } from "@atomico/storybook";
import { Avatar } from "@formas/avatar";
import { Button } from "@formas/button";
import { Icon } from "@formas/icon";
import { Card } from "@formas/card";

export default {
    title: "Components/Card",
    ...define(Card),
};

export const Default = (props) => (
    <Card {...props} class="layout " style="width: 320px">
        <Avatar slot="header">
            <img src="https://github.com/atomicojs.png" alt="avatar" />
        </Avatar>
        <Button slot="header" ghost>
            <Icon size="1.2rem" slot="prefix" type="options"></Icon>
        </Button>
        <img
            src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80"
            alt="Image"
            width="100%"
        />
        <article>
            <h3>Title</h3>
            <span>Subtitle</span>
            <p>
                fugiat veniam quis incididunt anim eiusmod nulla minim sunt
                ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo
                duis reprehenderit Lorem aliqua aute consequat dolor culpa
                tempor quis
            </p>
        </article>
        <Button slot="footer" small outline>
            Create
        </Button>
    </Card>
);

export const ContentAndFooter = (props) => (
    <Card {...props} style="width: 320px">
        <img
            src="https://images.unsplash.com/photo-1501862700950-18382cd41497?w=420&q=80"
            alt="Image"
        />
        <article>
            <h5>Title</h5>
            <span>Subtitle</span>
            <p>
                fugiat veniam quis incididunt anim eiusmod nulla minim sunt
                ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo
                duis reprehenderit Lorem aliqua aute consequat dolor culpa
                tempor quis
            </p>
        </article>
        <Button slot="footer" small outline>
            Create
        </Button>
        <Button slot="footer" small color="danger" ghost>
            Remove
        </Button>
    </Card>
);
