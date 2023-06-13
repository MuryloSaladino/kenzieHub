import { StyledBottomForm, StyledDialog, StyledModalInterior } from "./styles";
import { Text, Title2, Title3 } from "../../styles/typography";
import { Form } from "../Form";
import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";

import { useForm } from "react-hook-form";
import { forwardRef } from "react";

import { editTechSchema } from "./editTechSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { kenzieHub } from "../../service/api";

export const ModalEdit = forwardRef(({setUpdateTechs, updateTechs, tech}, ref) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(editTechSchema),
    })

    const submit = (formData) => {
        try {
            kenzieHub.put('users/techs/' + tech.id, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('@TOKEN')}`
                }
            })
            toast.success('Tecnologia alterada', {theme: 'dark'})
        } catch (err) {
            toast.error('Ops! Algo deu errado', {theme: 'dark'})
        }
        finally{
            setUpdateTechs((updateTechs ? false : true))
            ref.current.close()
        }
    }

    function deleteTech() {
        try {
            kenzieHub.delete('users/techs/' + tech.id, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('@TOKEN')}`
                }
            })
            toast.success('Tecnologia deletada', {theme: 'dark'})
        } catch (error) {
            toast.error('Ops! Algo deu errado', {theme: 'dark'})
        }
        finally{
            setUpdateTechs((updateTechs ? false : true))
            ref.current.close()
        }
    }

    
    return(
        <StyledDialog ref={ref} onClick={() => ref.current.close()}>
            <StyledModalInterior onClick={(e) => e.stopPropagation()}>
                <header>
                    <Title3>Tecnologia Detalhes</Title3>
                </header>

                <Title2 color='var(--grey-1)' onClick={() => ref.current.close()} >X</Title2>

                <Form onSubmit={handleSubmit(submit)} >
                    <Input type='text' label='Nome do projeto' value={tech.title} readonly />
                    {errors.title ? <Text color="var(--grey-1)">{errors.title.message}</Text> : null}
                    <Select options={['Iniciante', 'Intermediário', 'Avançado']} label='Status' register={register('status')} />
                    <StyledBottomForm>
                        <Button type='submit'>Salvar alterações</Button>
                        <Button grey type='button' onClick={deleteTech} >Excluir</Button>
                    </StyledBottomForm>
                </Form>
            </StyledModalInterior>
        </StyledDialog>
    )
})