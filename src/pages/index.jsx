import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { GlobalStyles, Container, Form, Title, ContainerInputs, Input, InputLabel } from "./styles.js";
import { Button } from "../../components/Button";

function Home() {
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const navigate = useNavigate();

  async function registerNewUser() {
    await api.post("/users", {
      name: inputName.current.value,
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value,
    });
    
    navigate("/lista-de-usuarios")
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        <Form>
          <Title>Cadastrar Usuário</Title>

          <ContainerInputs>
            <div>
              <InputLabel>
                Nome<span> *</span>
              </InputLabel>
              <Input type="text" placeholder="Nome do Usuário" ref={inputName} />
            </div>

            <div>
              <InputLabel>
                Idade<span> *</span>
              </InputLabel>
              <Input type="number" placeholder="Idade do Usuário" ref={inputAge} />
            </div>
          </ContainerInputs>

          <div style={{ width: "100%" }}>
            <InputLabel>
              Email<span> *</span>
            </InputLabel>
            <Input type="email" placeholder="Email do Usuário" ref={inputEmail} />
          </div>

          <Button type="button" onClick={registerNewUser} theme="primary">
            Cadastrar Usuários
          </Button>
        </Form>

        <Button type="button" onClick={() => navigate("/lista-de-usuarios")}>
          Ver Lista de Usuários
        </Button>

      </Container>
    </>
  );
}

function Home() {

  return <div>Home Page</div>;
}

export default Home; 
