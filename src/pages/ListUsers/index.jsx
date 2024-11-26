import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/Button/styles";
import TopBackground from "../../components/Button/TopBackground";
import Trash from "../../assets/trash.svg";
import { Container, ContainerUsers, CardUsers, TrashIcon, Title, AvatarUser } from "../styles"; 


function ListUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUsers() {
            try {
                const { data } = await api.get("/usuarios");
                setUsers(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        }
        getUsers();
    }, []);

    async function deleteUser(id) {
        try {
            await api.delete(`/usuarios/${id}`);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Navega para a página anterior
    };

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>

            <ContainerUsers>
                {users.map(user => (
                    <CardUsers key={user.id}>
                        <AvatarUser src={`https://avatar.iran.liara.run/public/?username=${user.id}`} />
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.age}</p>
                            <p>{user.email}</p>
                        </div>
                        <TrashIcon 
                            src={Trash} 
                            alt="Excluir" 
                            onClick={() => deleteUser(user.id)} 
                        />
                    </CardUsers>
                ))}
            </ContainerUsers>

            <Button type="button" onClick={handleGoBack}>Voltar</Button>
        </Container>
    );
}

export default ListUsers;
