import { css } from '@emotion/core'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit } from '../components/ui/Form'

// Validations
import useValidation from '../hooks/useValidation'
import validateCreateAccount from '../validation/createAccount'

const STATE_INITIAL = {
    name: '',
    email: '',
    password: ''
}

const CreateAccount = () => {

    const { values, submitForm, errors, handleSubmit, handleChange } = useValidation(STATE_INITIAL, validateCreateAccount, createAccount)

    const { name, email, password } = values

    function createAccount() {
        console.log('Creating account...')
    }

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem; 
                        `}
                    >Create Account</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Field>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </Field>
                        <Field>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Field>
                        <Field>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </Field>
                        <InputSubmit type="submit"
                            value="Create Account"
                        />
                    </Form>
                </>
            </Layout>
        </div>
    )
}

export default CreateAccount
