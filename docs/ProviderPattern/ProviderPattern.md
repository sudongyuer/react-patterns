# 提供者模式

>  使数据可用于多个子组件

## 简介

在许多例子中，我们需要将数据传递给很多子组件，但是这些数据是从组件树的顶层开始的，我们就不得不传递一些prop给不必要的组件，而提供者模式就是解决这样问题的一个设计模式，主要应用依赖于React中Context

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gz5apdd1xtj30wq0k4dh3.jpg" alt="image-20220207215235596" style="zoom:50%;" />

## 实现

```jsx
export const ThemeContext = React.createContext();

const themes = {
  light: {
    background: "#fff",
    color: "#000"
  },
  dark: {
    background: "#171717",
    color: "#fff"
  }
};

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme
  };

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />
        <List />
      </ThemeContext.Provider>
    </div>
  );
}
```

```jsx
import React, { useContext } from "react";
import { ThemeContext } from "./App";

export default function Toggle() {
  const theme = useContext(ThemeContext);

  return (
    <label className="switch">
      <input type="checkbox" onClick={theme.toggleTheme} />
      <span className="slider round" />
    </label>
  );
}
```

## 使用Hooks

- 我们可以使用hooks来封装useContext的逻辑，这样就不必在每个组件中都去使用useContext了
- 我们可以创建一个HOC来包装该组件以提供其值。通过这种方式，我们可以将上下文逻辑从呈现组件中分离出来，这提高了提供者的可重用性。

```jsx
function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return theme;
}
```

```jsx
function ThemeProvider({children}) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider>
        <Toggle />
        <List />
      </ThemeProvider>
    </div>
  );
}
```

`直接在组件中使用自定义的useThemeContext`

```jsx
export default function TextBox() {
  const theme = useThemeContext();

  return <li style={theme.theme}>...</li>;
}
```

## [styled-components](https://styled-components.com/docs/advanced)

React生态系统中有一个`styled-components`css in js的样式解决方案，同样使用了`提供者模式`来提供多个组件需要使用的数据，最常见的就是app的主题，styled-components内置了它

```jsx
import { ThemeProvider } from "styled-components";

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider theme={themes[theme]}>
        <>
          <Toggle toggleTheme={toggleTheme} />
          <List />
        </>
      </ThemeProvider>
    </div>
  );
}
```

```jsx
import styled from "styled-components";

export default function ListItem() {
  return (
    <Li>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Li>
  );
}

const Li = styled.li`
  ${({ theme }) => `
     background-color: ${theme.backgroundColor};
     color: ${theme.color};
  `}
`;
```



## 优点

提供者模式利用React `Context`API使得将数据传递给许多组件成为可能，而不必手动地通过每个组件层传递数据。 使用Provider模式可以很容易地保持某种全局状态，因为我们可以让组件访问这种全局状态。

## 缺点

在某些情况下，过度使用Provider模式可能会导致性能问题。所有使用上下文的组件都会在每次状态更改时重新呈现。

当然， 为了确保组件不会使用包含可能更新的不必要值的提供者，你可以为每个单独的用例创建几个提供者。