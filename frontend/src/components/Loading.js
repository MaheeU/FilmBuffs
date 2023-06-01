import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

const Rotate = keyframes`
  0% {
    transform: rotate(0deg);
  } 
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled(FiLoader)`
  height: 100px;
  width: 100px;
  animation: ${Rotate} 2s infinite;
  color: darkred;
`;

export default Loading;
