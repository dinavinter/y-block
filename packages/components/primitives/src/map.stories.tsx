// src/map.stories.tsx
import {define} from "@atomico/storybook";
import * as Y from 'yjs';
import {YMap} from "./map";
import "./map.define";
import {html} from "atomico";

export default {
    title: "@y-block/primitives/map-template",
    ...define(YMap),
    argTypes: {
        debug: {
            control: 'boolean',
            description: 'Enable debug mode to see the current data',
            defaultValue: false
        }
    }
};

// Helper function to create a Y.Map from an object
function ymap(obj: Record<string, any>): Y.Map<any> {
    const map = new Y.Doc().getMap("map");
    Object.entries(obj).forEach(([key, value]) => {
        map.set(key, value);
    });
    return map;
}

// Basic example with simple data binding
export const BasicTemplate = (args: any) => {


    return (
        <y-map
            map={ymap({
                name: "John Doe",
                age: 30,
                email: "john@example.com"
            })}
            debug={args.debug}
        >
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h1>User Profile</h1>
                <div style="margin-bottom: 10px;">
                    <strong>Name:</strong> {`{{name}}`}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Age:</strong> {`{{age}}`}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Email:</strong> {`{{email}}`}
                </div>
            </div>
        </y-map>
    );
};

BasicTemplate.parameters = {
    docs: {
        description: {
            story: `
## Basic Template Example

This example shows simple variable interpolation with Vento.js. The syntax \`{{variableName}}\` inserts the value of the variable into the template.

### Template:
\`\`\`html
<div>
  <h1>User Profile</h1>
  <div><strong>Name:</strong> {{name}}</div>
  <div><strong>Age:</strong> {{age}}</div>
  <div><strong>Email:</strong> {{email}}</div>
</div>
\`\`\`

### Data:
\`\`\`json
{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}
\`\`\`
            `
        }
    }
};
//
//
// // Example with conditional rendering
export const ConditionalTemplate = (args: any) => {
    const template = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>User Profile</h1>
            <div style="margin-bottom: 10px;">
                <strong>Name:</strong> {{name}}
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Age:</strong> {{age}}
            </div>
            {{ if age >= 18 }}
                <div style="color: green; margin-bottom: 10px;">
                    This user is an adult.
                </div>
            {{ /if }}
            {{ if age < 18 }}
                <div style="color: orange; margin-bottom: 10px;">
                    This user is a minor.
                </div>
            {{ /if }}
            {{ if isAdmin }}
                <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
                    <strong>Admin Access Granted</strong>
                    <p>This user has administrative privileges.</p>
                </div>
            {{ /if }}
        </div>
    `;
    return html`
        <y-map  map=${ymap({
                    name: "Jane Smith",
                    age: 17,
                    isAdmin: true
                })}
                debug=${args.debug}
                template=${template}
        > 
        </y-map>`
};

ConditionalTemplate.parameters = {
    docs: {
        description: {
            story: `
## Conditional Rendering Example

This example demonstrates conditional rendering with Vento.js using the \`if\` directive.

### Template:
\`\`\`html
<div>
  <!-- Basic info -->
  <h1>User Profile</h1>
  <div><strong>Name:</strong> {{name}}</div>
  <div><strong>Age:</strong> {{age}}</div>

  <!-- Conditional based on age -->
  {{if age >= 18}}
    <div style="color: green">This user is an adult.</div>
  {{else}}
    <div style="color: orange">This user is a minor.</div>
  {{/if}}

  <!-- Conditional based on admin status -->
  {{if isAdmin}}
    <div style="background-color: #f0f0f0; padding: 10px;">
      <strong>Admin Access Granted</strong>
      <p>This user has administrative privileges.</p>
    </div>
  {{/if}}
</div>
\`\`\`

### Data:
\`\`\`json
{
  "name": "Jane Smith",
  "age": 17,
  "isAdmin": true
}
\`\`\`
            `
        }
    }
};


// Example with array iteration
export const ArrayTemplate = (args: any) => {
    const template = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
         
            <h1>{{user}}'s Dashboard</h1> 
            <h2>Shopping List</h2>
            <ul style="list-style-type: circle;">
                {{ for item of items }}
                    <li>{{item}}</li>
                {{/for}}
            </ul>
      

            <h2>Tasks</h2>
            <ul style="list-style-type: none; padding: 0;">
              {{ for task of tasks }}
                    <li style="
                        padding: 10px; 
                        margin: 5px 0; 
                        background-color: {{task.done ? '#e6ffe6' : '#fff0f0'}};
                        border-radius: 5px;
                        display: flex;
                        align-items: center;
                    ">
                        <span style="
                            display: inline-block; 
                            width: 20px; 
                            height: 20px; 
                            border-radius: 50%; 
                            background-color: {{task.done ? 'green' : 'red'}};
                            margin-right: 10px;
                        "></span>
                        <span style="text-decoration: {{task.done ? 'line-through' : 'none'}};">
                            {{task.title}}
                        </span>
                    </li>
              {{/for}}
            </ul>
        </div>
    `;

    return (
        <y-map
            map={ymap({
                user: "Alice Johnson",
                items: ["Apple", "Banana", "Cherry", "Date"],
                tasks: [
                    { id: 1, title: "Complete project", done: true },
                    { id: 2, title: "Review code", done: false },
                    { id: 3, title: "Deploy application", done: false }
                ]
            })}
            template={template}
            debug={args.debug}
        >
        </y-map>
    );
};

// Example with dynamic updates
export const DynamicTemplate = (args: any) => {
    const dynamicMap = new Y.Doc().getMap("map");
    dynamicMap.set("counter", 0);
    dynamicMap.set("lastUpdated", new Date().toLocaleString());

    // Update the counter every second
    setInterval(() => {
        dynamicMap.set("counter", (dynamicMap.get("counter") as number) + 1);
        dynamicMap.set("lastUpdated", new Date().toLocaleString());
    }, 1000);

    const template = `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <h1>Live Counter</h1>
            <div style="
                font-size: 48px; 
                font-weight: bold;
                margin: 20px 0;
                color: {{counter % 2 === 0 ? 'blue' : 'red'}};
            ">
                {{counter}}
            </div>
            <p>Last updated: {{lastUpdated}}</p>
            <div>
                {{if counter % 5 === 0}}
                    <div style="
                        background-color: #ffff00; 
                        padding: 10px; 
                        border-radius: 5px;
                        display: inline-block;
                    ">
                        Milestone reached!
                    </div>
                {{/if}}
            </div>
        </div>
    `;

    return (
        <y-map map={dynamicMap} debug={args.debug} template={template}>
          
        </y-map>
    );
};

