import { config } from 'dotenv'
import { tool, Tool } from "@langchain/core/tools";
import * as zod from "zod";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolMessage } from "@langchain/core/messages";
import { ChatOpenAI } from '@langchain/openai'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ToolNode } from '@langchain/langgraph/prebuilt';
config();

//define LLM Modle
const LLM = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
    apiKey: process.env.GEMINI_API_KEY as string
});

// Default add function
const multiply = tool(async ({ a, b }:{a:number,b:number}) => {
    return a * b;
}, {
    name: 'multiply',
    description: 'Multiply two numbers',
    schema: zod.object({
        a: zod.number().describe('A is Must Be A Number Type.'),
        b: zod.number().describe('B is Must Be A Number Type.')
    })
})

const devide = tool(async ({ a, b }:{a:number,b:number}) => {
    return a + b;
}, {
    name: 'devide',
    description: 'devide two numbers',
    schema: zod.object({
        a: zod.number().describe('A is Must Be A Number Type.'),
        b: zod.number().describe('B is Must Be A Number Type.')
    })
})

const addition = tool(async ({ a, b }:{a:number,b:number}) => {
    return a + b;
}, {
    name: 'addition',
    description: 'add two numbers',
    schema: zod.object({
        a: zod.number().describe('A is Must Be A Number Type.'),
        b: zod.number().describe('B is Must Be A Number Type.')
    })
})

const subtraction = tool(async ({ a, b }:{a:number,b:number}) => {
    return a + b;
}, {
    name: 'subtraction',
    description: 'subtract two numbers',
    schema: zod.object({
        a: zod.number().describe('A is Must Be A Number Type.'),
        b: zod.number().describe('B is Must Be A Number Type.')
    })
})

// array of avaliables tools;
const tools = [addition, subtraction, multiply, devide];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = LLM.bindTools(tools);
// call llM function;

// Nodes
async function llmCall(state: typeof MessagesAnnotation.State) {
    // LLM decides whether to call a tool or not
    const result = await llmWithTools.invoke([
        {
            role: "system",
            content: "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
        },
        ...state.messages
    ]);

    return {
        messages: [result]
    };
}


// funtion node call.
const toolNode = new ToolNode(tools);
// async function toolNode(state) {
//     const messages = state.messages;
//     const lastMessage = messages.at(-1);
//     const result = [];
//     if (lastMessage?.tool_calls?.length) {
//         for (const toolCall of lastMessage.tool_calls) {
//             const tool = toolsByName[toolCall.name];
//             const observation = await tool.invoke(toolCall.args);
//             result.push(
//                 new ToolMessage({
//                     content: observation,
//                     tool_call_id: toolCall.id
//                 })
//             )
//         }
//     }
//     return { message: result };
// }

// Conditional edge function to route to the tool node or end
function shouldContinue(state: typeof MessagesAnnotation.State) {
    const messages = state.messages;
    const lastMessage = messages.at(-1);

    // If the LLM makes a tool call, then perform an action
    if (lastMessage?.tool_calls?.length) {
        return "Action";
    }
    // Otherwise, we stop (reply to the user)
    return "__end__";
}

// Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
    .addNode("llmCall", llmCall)
    .addNode("tools", toolNode)
    // Add edges to connect nodes
    .addEdge("__start__", "llmCall")
    .addConditionalEdges(
        "llmCall",
        shouldContinue,
        {
            // Name returned by shouldContinue : Name of next node to visit
            "Action": "tools",
            "__end__": "__end__",
        }
    )
    .addEdge("tools", "llmCall")
    .compile();

// Invoke
const messages = [{
    role: "user",
    content: "Add 3 and 4 then multipty the result by 10 and devide it by 2."
}];
const result = await agentBuilder.invoke({ messages });
console.log(result.messages);