import { c, css } from "atomico";

function hero() {
    return (
        <host shadowDom>
            <div class="layout">
                <div class="layout-left">
                    <img src="/logo-by-atomico.svg" alt="" />
                    <h1>
                        <strong>Component system</strong>
                        <br />
                        <span>
                            to exemplify the use of
                            <br />
                            Atomico + Storybook
                        </span>
                    </h1>
                </div>
                <div class="layout-right">
                    <div class="layout-phone">
                        <img src="/sample.webp" alt="" />
                    </div>
                </div>
            </div>
        </host>
    );
}

hero.props = {
    title1: String,
    title2: String,
    subtitle: String,
};

hero.styles = css`
    :host {
        display: flex;
        width: 100%;
    }
    h1 {
        font-size: 40px;
        font-weight: 800;
    }
    h1 span {
        -webkit-text-fill-color: white;
        -webkit-text-stroke: 1px currentColor;
    }
    .layout {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        gap: 80px;
        justify-content: space-between;
    }
    .layout-phone {
        width: 340px;
        background: white;
        border-radius: 32px;
        box-shadow: rgba(0, 0, 0, 0.05) -120px 0px 120px,
            rgba(255, 0, 0, 0.1) -60px -60px 120px,
            rgba(0, 0, 255, 0.1) 60px 60px 120px;
        overflow: hidden;
    }

    .layout-phone img {
        width: 100%;
        display: block;
    }
`;

customElements.define("story-hero", c(hero));
