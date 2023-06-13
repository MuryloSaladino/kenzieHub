import { StyledHeader, StyledTechContainer, StyledTechList, StyledWelcome } from "./styles";
import { Text, Title1, Title2, Title3 } from "../../styles/typography";
import { Loading } from "../../components/Loading";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";

import plus from '../../assets/plus.svg'

import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { kenzieHub } from '../../service/api'
import { Modal } from "../../components/ModalTech";
import { v4 as uuidv4 } from 'uuid';
import { ModalEdit } from "../../components/ModalEditTech";

export function Dashboard() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updateTechs, setUpdateTechs] = useState(true)
    const [currentTech, setCurrentTech] = useState({title: '', status: ''})
    const modalRef = useRef(null)
    const modalEditRef = useRef(null)
    const navigate = useNavigate()

    function endSession() {
        localStorage.removeItem('@TOKEN')
        localStorage.removeItem('@USERID')
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        async function checkStorage() {
        if(localStorage.getItem('@TOKEN')) {
            try {
            const {data} = await kenzieHub.get('profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('@TOKEN')}`
                }
            })
            setUser(data)
            } catch (error) {
            toast.error('Ops! Algo deu errado', {theme: 'dark'})
            navigate('/')
            }
            finally{
                setLoading(false)
            }
        }
        }
        checkStorage()
    }, [updateTechs])

    return(
        loading ?
        <>
            <StyledHeader>
                <div>
                    <Logo/>
                    <Button small onClick={endSession} >Sair</Button>
                </div>
            </StyledHeader>
            <Loading/>
        </> :

        <>
            <Modal ref={modalRef} setUpdateTechs={setUpdateTechs} updateTechs={updateTechs} />
            <ModalEdit ref={modalEditRef} setUpdateTechs={setUpdateTechs} updateTechs={updateTechs} tech={currentTech} />

            <StyledHeader>
                <div>
                    <Logo/>
                    <Button small onClick={endSession} >Sair</Button>
                </div>
            </StyledHeader>

            <StyledWelcome>
                <div>
                    <Title1>Olá, {user.name}</Title1>
                    <Text color="var(--grey-1)">{user.course_module}</Text>
                </div>
            </StyledWelcome>

            <StyledTechContainer>
                <div>
                    <Title2>Tecnologias</Title2>
                    <Button small onClick={() => {modalRef.current.showModal()}} >
                        <img src={plus} />
                    </Button>
                </div>

                <StyledTechList>
                    {
                        user.techs.length > 0 ?
                        user.techs.map(tech => 
                            <li key={uuidv4()} onClick={() => {setCurrentTech(tech); modalEditRef.current.showModal()}}>
                                <Title2>{tech.title}</Title2>
                                <Text color="var(--grey-1)">{tech.status}</Text>
                            </li>
                        ) :
                        <li><Title3>Você ainda não adicionou nenhuma technologia</Title3></li>
                    }
                </StyledTechList>
            </StyledTechContainer>
        </>
    )
}

