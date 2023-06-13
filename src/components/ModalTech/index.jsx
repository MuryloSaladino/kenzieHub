import { forwardRef } from "react";
import { StyledDialog, StyledModalInterior } from "./styles";
import { Text, Title2, Title3 } from "../../styles/typography";
import { Form } from "../Form";
import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "../Button";
import { useForm } from "react-hook-form";
import { newTechSchema } from "./newTechSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { kenzieHub } from "../../service/api";
import { toast } from "react-toastify";

export const Modal = forwardRef(({updateTechs, setUpdateTechs}, ref) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(newTechSchema),
    })

    const submit = (formData) => {
        try {
            kenzieHub.post('users/techs', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('@TOKEN')}`
                }
            })
            toast.success('Tecnologia cadastrada', {theme: 'dark'})
        } catch (err) {
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
                    <Title3>Cadastrar Tecnologia</Title3>
                </header>

                <Title2 color='var(--grey-1)' onClick={() => ref.current.close()} >X</Title2>

                <Form onSubmit={handleSubmit(submit)} >
                    <Input type='text' label='Nome' placeholder='Digite aqui o nome' register={register('title')} />
                    {errors.title ? <Text color="var(--grey-1)">{errors.title.message}</Text> : null}
                    <Select options={['Iniciante', 'Intermediário', 'Avançado']} label='Selecionar Status' register={register('status')} />
                    <Button type='submit'>Cadastrar Tecnologia</Button>
                </Form>
            </StyledModalInterior>
        </StyledDialog>
    )
})