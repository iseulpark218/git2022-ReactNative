import React, {createContext, useContext} from 'react';
import type {FC} from 'react';

// type안에서 사용할 내용 {} , 속성이 필요하면 속성/함수필요하면 함수 적어
export type ToggleThemeContextType = {
  toggleTheme: () => void;
};

// 함수아냐. 그냥 블럭만들어 사용하는
const defaultToggleThemeContext = {
  toggleTheme: () => {},
};

const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defaultToggleThemeContext,
);

type ToggleThemeContextProps = {
  // ()함수를 정의한 타입 void, 이 함수 통해 props에 보내주겠다.
  toggleTheme: () => void;
};
// 여기서 괄호()는 매개변수
// 전달받는 매개변수 여러개{,}
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children,
  toggleTheme,
}) => {
  // 구동시킬 코드는 {} 안에
  const value = {
    toggleTheme,
  };
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  );
};

// useToggleTheme 함수 만들어 주기
export const useToggleTheme = () => {
  // toggleTheme라는 함수를 통해서, useContext(toggle~)을 사용하는지 확인하겠다
  // Context종류는 ToggleThemeContext
  const {toggleTheme} = useContext(ToggleThemeContext);
  return toggleTheme;
};
