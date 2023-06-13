import { StyledMainLogin } from "./styles";
import { Form } from "../../components/Form";
import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Text, TextBold } from "../../styles/typography";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { useNavigate } from "react-router-dom";

import { kenzieHub } from "../../service/api";

export function LoginPage() {

    const navigate = useNavigate()

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const submit = async (formData) => {
        try {
            const {data} = await kenzieHub.post('/sessions', formData)
            toast.success('Login realizado com sucesso', {theme: 'dark'})
            localStorage.setItem('@TOKEN', data.token)
            localStorage.setItem('@USERID', data.user.id)
            navigate('/dashboard')
        } catch (err) {
            toast.error('Ops! Email ou senha incorretos', {theme: 'dark'})
        }
    }

    return(
        <>
            <StyledMainLogin>
                <Logo/>
                <Form formName='Login' onSubmit={handleSubmit(submit)}>
                    <Input
                        type='email'
                        placeholder='Digite aqui seu email'
                        label='Email'
                        register={register('email')}
                    />
                    {errors.email ? <Text color="var(--grey-1)">{errors.email.message}</Text> : null}
                    <Input
                        type='password'
                        placeholder='Digite aqui sua senha'
                        label='Senha'
                        register={register('password')}
                    />
                    {errors.password ? <Text color="var(--grey-1)">{errors.password.message}</Text> : null}
                    <Button type='submit'>Entrar</Button>

                    <div>
                        <TextBold color="var(--grey-1)">Ainda não possui uma conta?</TextBold>
                        <Button grey link={'/register'}>Cadastrar</Button>
                    </div>
                </Form>
            </StyledMainLogin>
        </>
    )
}