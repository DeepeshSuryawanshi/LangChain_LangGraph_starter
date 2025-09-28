# LangChain & LangGraph AI Agent Starter

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org/)
[![LangChain](https://img.shields.io/badge/LangChain-Core-orange.svg)](https://github.com/langchain-ai/langchainjs)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent-purple.svg)](https://github.com/langchain-ai/langgraphjs)

A comprehensive starter project for learning and exploring LangChain and LangGraph AI frameworks. This project demonstrates how to build intelligent AI agents capable of performing mathematical operations using tool calling and workflow orchestration.

## 🎯 Project Overview

This project showcases the integration of LangChain and LangGraph to create an AI agent that can:
- Perform mathematical calculations (addition, subtraction, multiplication, division)
- Make intelligent decisions about when to use tools
- Chain multiple operations together
- Handle complex multi-step mathematical problems

## 🚀 Features

- **Tool Integration**: Custom mathematical tools with Zod schema validation
- **AI Agent Workflow**: State-based graph execution with conditional routing
- **Multi-LLM Support**: Compatible with OpenAI and Google Gemini models
- **Error Handling**: Robust error handling and validation
- **Extensible Architecture**: Easy to add new tools and capabilities

## 🛠 Technology Stack

- **Runtime**: Node.js (ES Modules)
- **AI Framework**: LangChain Core
- **Workflow Orchestration**: LangGraph
- **LLM Providers**: 
  - Google Gemini (gemini-2.5-flash)
  - OpenAI GPT (optional)
- **Schema Validation**: Zod
- **Environment Management**: dotenv

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn package manager
- Google Gemini API key (or OpenAI API key)

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DeepeshSuryawanshi/LangChain_LangGraph_starter.git
   cd LangChain_LangGraph_starter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   # Optional: OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the application:**
   ```bash
   node index.js
   ```

## 📚 Core Concepts

### LangChain Integration

LangChain provides the foundation for building AI applications with:
- **Tools**: Reusable functions that AI can call
- **Schemas**: Type-safe input validation with Zod
- **LLM Binding**: Seamless integration with language models

### LangGraph Workflow

LangGraph orchestrates the AI agent's decision-making process:

```
Start → LLM Call → Decision Point → Tools → LLM Call → End
                     ↓
                   End (if no tools needed)
```

### Tool System

The project includes four mathematical tools:

1. **Addition**: Adds two numbers
2. **Subtraction**: Subtracts two numbers  
3. **Multiplication**: Multiplies two numbers
4. **Division**: Divides two numbers

Each tool includes:
- Type-safe parameters with Zod schemas
- Descriptive metadata for AI understanding
- Error handling and validation

## 🏗 Architecture Overview

### State Management
```javascript
const agentBuilder = new StateGraph(MessagesAnnotation)
```
Uses LangGraph's `MessagesAnnotation` for conversation state management.

### Node Definitions
- **llmCall**: Processes user input and decides on actions
- **tools**: Executes mathematical operations
- **shouldContinue**: Conditional routing logic

### Workflow Edges
- **Sequential**: `__start__` → `llmCall` → `tools` → `llmCall`
- **Conditional**: Dynamic routing based on LLM decisions

## 💡 Usage Examples

### Basic Calculation
```javascript
const messages = [{
    role: "user",
    content: "What is 15 + 25?"
}];
```

### Complex Multi-step Operations
```javascript
const messages = [{
    role: "user", 
    content: "Add 3 and 4, then multiply the result by 10 and divide it by 2."
}];
```

## 🔍 Code Structure

```
├── index.js          # Main application file
├── package.json      # Dependencies and scripts
├── DOcs.txt         # Documentation links
├── README.md        # This file
├── .env             # Environment variables (create this)
└── src/
    └── main.ts      # TypeScript source (if applicable)
```

## 🎓 Learning Resources

### Official Documentation
- [LangGraph Quickstart](https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/)
- [LangChain Workflows](https://langchain-ai.github.io/langgraphjs/tutorials/workflows/#agent)
- [LangSmith Platform](https://www.langchain.com/langsmith)

### Key Learning Points

1. **Tool Creation**: How to define and register custom tools
2. **State Management**: Managing conversation state across workflow nodes
3. **Conditional Logic**: Implementing decision trees in AI workflows
4. **Schema Validation**: Type-safe AI function calling
5. **Multi-LLM Support**: Switching between different AI providers

## 🚦 Getting Started Guide

### Step 1: Understand the Workflow
1. User sends a mathematical query
2. LLM analyzes the request
3. If calculation needed → calls appropriate tools
4. Tools perform operations and return results
5. LLM formulates final response

### Step 2: Modify and Extend
- Add new mathematical operations (power, square root, etc.)
- Integrate different LLM providers
- Add memory and conversation history
- Implement error recovery mechanisms

### Step 3: Advanced Features
- Multi-agent orchestration
- External API integrations
- Database connectivity
- Real-time streaming responses

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
```bash
Error: API key not found
```
Solution: Ensure your `.env` file contains the correct API key.

**Module Import Errors**
```bash
Error: Cannot find module '@langchain/core'
```
Solution: Run `npm install` to install all dependencies.

**Tool Execution Errors**
Check that tool functions return the correct data types and handle edge cases.

## 🤝 Contributing

This is a learning project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Deepesh Suryawanshi** (deepesh.ai)
- Learning AI/ML and exploring LangChain ecosystem
- Follow along with Piyush Garg's tutorials

## 🙏 Acknowledgments

- [Piyush Garg](https://github.com/piyushgarg-dev) for educational content
- LangChain team for the amazing framework
- OpenAI and Google for providing powerful AI models

## 🔮 Future Enhancements

- [ ] Add more mathematical operations
- [ ] Implement conversation memory
- [ ] Add web interface
- [ ] Integrate with vector databases  
- [ ] Add unit tests
- [ ] Docker containerization
- [ ] Deploy to cloud platforms

---

**Happy Learning! 🚀**

*This project serves as a hands-on introduction to building AI agents with LangChain and LangGraph. Experiment, modify, and extend it to deepen your understanding of AI application development.*