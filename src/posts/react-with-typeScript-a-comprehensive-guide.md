---
title: "React with TypeScript: A Comprehensive Guide"
author: "Pratik Hole"
date: "2025-05-05"
tags: ["TypeScript", "Reactjs", "Blogging", "Guide", "Productivity"]
coverImg: "/posts/react/react-typescript.png"
---

# React with TypeScript: A Comprehensive Guide

## Introduction

React is a powerful JavaScript library for building user interfaces. TypeScript is a statically typed superset of JavaScript that adds optional typing and other features. Combining React with TypeScript helps catch errors during development, improves code quality, and provides a better developer experience.

---

## Why Use TypeScript with React?

- **Type Safety**: Reduces bugs by catching type-related issues at compile time.
- **Better Developer Experience**: Offers autocompletion, refactoring, and improved IntelliSense.
- **Improved Readability**: Clearly defines component props and state types.
- **Scalability**: Easier to maintain large codebases.

---

## Setting Up React with TypeScript

You can set up a new React + TypeScript project using Create React App:

```bash
npx create-react-app my-app --template typescript
```

This sets up a project with TypeScript configuration (`tsconfig.json`) and `.tsx` files.

---

## TypeScript File Extensions

- `.ts` for plain TypeScript files
- `.tsx` for files containing JSX (React components)

---

## Typing Component Props and State

### Functional Component with Props

```tsx
type GreetingProps = {
  name: string;
  age?: number; // optional prop
};

const Greeting: React.FC<GreetingProps> = ({ name, age }) => (
  <div>
    <p>Hello, {name}!</p>
    {age && <p>You are {age} years old.</p>}
  </div>
);
```

---

## Using useState with TypeScript

```tsx
import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

---

## useEffect with TypeScript

```tsx
import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>Timer: {seconds}s</p>;
};
```

---

## Typing Events

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked!", e);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Input value:", e.target.value);
};
```

---

## Typing useRef

```tsx
import { useRef, useEffect } from "react";

const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
};
```

---

## DefaultProps and Optional Props

```tsx
type ButtonProps = {
  text: string;
  color?: string;
};

const Button: React.FC<ButtonProps> = ({ text, color = "blue" }) => {
  return <button style={{ color }}>{text}</button>;
};
```

---

## React Context with TypeScript

```tsx
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);
```

---

## React with TypeScript and Redux (Basic Example)

```ts
// types.ts
export interface CounterState {
  count: number;
}

export const INCREMENT = "INCREMENT";

interface IncrementAction {
  type: typeof INCREMENT;
}

export type CounterActionTypes = IncrementAction;
```

```ts
// reducer.ts
import { CounterState, INCREMENT, CounterActionTypes } from "./types";

const initialState: CounterState = { count: 0 };

export function counterReducer(
  state = initialState,
  action: CounterActionTypes
): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    default:
      return state;
  }
}
```

---

## TypeScript and React Router

```tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
```

---

## TypeScript with Styled Components

```tsx
import styled from "styled-components";

type ButtonProps = {
  primary?: boolean;
};

const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
`;
```

---

## TypeScript Utility Types in React

- **Partial<Type>**: Makes all properties optional
- **Required<Type>**: Makes all properties required
- **Pick<Type, Keys>**: Creates a type by picking the set of properties
- **Omit<Type, Keys>**: Creates a type by removing the set of properties

Example:

```ts
type FullUser = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<FullUser>;
type RequiredUser = Required<FullUser>;
```

---

## Best Practices

- Prefer `interface` over `type` for public APIs
- Use `React.FC` for functional components
- Avoid using `any`; try to be explicit
- Organize types and interfaces in a `types/` directory
- Use default values for optional props

---

## Common Errors and Fixes

- **JSX Element implicitly has type 'any'**: Add return type to your component
- **Cannot find name 'React'**: Make sure React is imported
- **No overload matches this call**: Check event or prop types
- **Property does not exist**: Verify correct typing and interface use

---

## Conclusion

Combining React with TypeScript helps build robust, scalable, and error-free applications. It improves code quality, team collaboration, and long-term maintainability. Whether you're building a small component or a large application, TypeScript is a powerful tool in any React developer's toolkit.

---

_Happy Coding with React and TypeScript!_
