import React, { useState, useContext } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import authContext from "../context/auth-contex";

export default function Auth(props) {
  //mjenjanje izmedju log in i sign up
  const [isLogin, setIsLogin] = useState({ isLogin: false });

  const [inputValues, setInputValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  //contex koji uzmam da li user ima token
  const [context, setContext] = useContext(authContext);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    //console.log(inputValues);
  };
  //poziv ka bazi da dodjelim  tokena ili da li ga registrujem
  const onSubmit = (event) => {
    setIsLogin({ isLogin: !isLogin.isLogin });
    event.preventDefault();
    console.log(inputValues);

    var requestBody = {
      query: `
      mutation{
        createUser(userInput:{name:"${inputValues.name}", surname: "${inputValues.surname}", password:"${inputValues.password}", email:"${inputValues.email}"}) {
          password
        }
      }
            `,
    };

    if (!isLogin.isLogin) {
      requestBody = {
        query: `
                {
                    login(email: "${inputValues.email}", password:"${inputValues.password}"){
                      userId
                      token
                      tokenExperation
                    }
                  }
                `,
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(async (data) => {
        if (data.data.login.token) {
          //contextType.login(data.data.login.token, data.data.login.userId)

          await setContext({
            token: data.data.login.token,
            userId: data.data.login.userId,
          });

          localStorage.setItem("token", data.data.login.token);
          localStorage.setItem("userId", data.data.login.userId);
        }
      })
      .catch((err) => {});
  };

  const changeLogin = () => {
    setIsLogin({ isLogin: !isLogin.isLogin });
  };

  return (
    <Container className="App">
      <h2>{isLogin.isLogin ? "Sing up" : "Log in"}</h2>
      <Form className="form" onSubmit={onSubmit}>
        {isLogin.isLogin ? (
          <React.Fragment>
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={inputValues.name}
                  placeholder="name"
                  onChange={handleOnChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Surname</Label>
                <Input
                  type="text"
                  name="surname"
                  value={inputValues.surname}
                  placeholder="surname"
                  onChange={handleOnChange}
                  required
                />
              </FormGroup>
            </Col>
          </React.Fragment>
        ) : (
          ""
        )}
        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={inputValues.email}
              id="exampleEmail"
              placeholder="myemail@email.com"
              onChange={handleOnChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={inputValues.password}
              id="examplePassword"
              placeholder="********"
              onChange={handleOnChange}
            />
          </FormGroup>
        </Col>
        <Button type="button" onClick={changeLogin}>
          Switch to {isLogin.isLogin ? "Log in" : "Sign up"}
        </Button>
        <Button type="Submit">Submit</Button>
      </Form>
    </Container>
  );
}
