import { motion } from "framer-motion";
import { ChangeEvent, useEffect } from "react";
import { styled } from "styled-components";

import { InputInnerProps, InputWrapperProps } from "./type";

import { colorTheme } from "@/style/color-theme";

export const CommonInput = ({ children, ...props }: InputWrapperProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

const InputInner = ({
  children,
  gap = "2%",
  value,
  setValue,
  maximum,
  minimum,
  isError,
  setIsError,
}: InputInnerProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > maximum) {
      setValue(maximum.toString());
      setIsError(true);
    } else if (e.target.value === "") {
      setValue("");
      setIsError(false);
    } else {
      if (minimum && Number(e.target.value) < minimum) {
        setValue(isError ? e.target.value : minimum.toString());
        setIsError(true);
      } else {
        setValue(e.target.value);
        setIsError(false);
      }
    }
  };

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setIsError(false);
    }, 5000);

    return () => {
      clearTimeout(errorTimeout);
    };
  }, [value]);

  return (
    <EachBox style={{ gap: gap }}>
      <StyledInput
        type="number"
        value={value}
        onChange={handleInputChange}
        animate={{
          x: isError ? [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0] : 0,
        }}
        transition={{ duration: 0.5, repeat: 0 }}
        style={{
          color: isError ? colorTheme.orange400 : "white",
          backgroundColor: isError
            ? colorTheme.orange200
            : colorTheme.orange400,
        }}
      />
      <TextDiv>{children}</TextDiv>
    </EachBox>
  );
};

CommonInput.InputInner = InputInner;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 3% 10%;
  gap: 5%;
`;

const EachBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const TextDiv = styled.div`
  font-size: 3rem;
  margin: 0 0 5% 2%;
  width: 3.3rem;
`;
//* 기존 fontsize 1.11rem */
//기존 width: 2.3rem
const StyledInput = styled(motion.input)`
  width: 100%;
  height: 4.39rem;
  border-radius: 0.83rem;
  text-align: center;
  font-size: 3.78rem;
  font-weight: bold;
  border: none;
`;
//* 기존 fontsize 2.78rem */
//http://localhost:3000/posting/3 시,분 폰트크기
