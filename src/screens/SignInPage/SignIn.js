import React from "react";
import styled from "styled-components";
import Input from "./SignInElements";
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Container>
      <LogoWrapper>
        <h3>
          Welcome <span>Back</span>
        </h3>
      </LogoWrapper>
      <Form>
        <h3>Sign In</h3>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <button>Sign In</button>
      </Form>
      <div>
        <h4>
          Don't have an account? <Link to='/tf-page'>
                  <Button>
                    Sign Up
                  </Button>
                </Link>
        </h4>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: rgba(62, 144, 60, 0.8);
  font-weight: 300;
`;

const Button = styled.button`
  width: 75%;
  width: fit-content;
  height: 25px;
  border: none;
  margin: 1rem 0;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background-color: #ca7df9;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);
  }

`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #ca7df9;
    margin-bottom: 3rem;
  }

  button {
    width: 75%;
    max-width: 350px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #ca7df9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 6rem;
  }

  h3 {
    color: #ca7df9;
    text-align: center;
    font-size: 22px;
  }

  span {
    color: #724cf9;
    font-weight: bold;
    font-size: 25px;
    font-family: 'Advent Pro', sans-serif;
  }
`;

const Container = styled.div`
  min-width: 400px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 13px;
    margin-top: 2rem;

    span {
      color: rgba(62, 144, 60, 0.8);
      cursor: pointer;
    }
  }
`;

export default SignIn;