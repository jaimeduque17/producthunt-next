import { css } from '@emotion/core'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit } from '../components/ui/Form'

const CreateAccount = () => (
    <div>
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem; 
                    `}
                >Create Account</h1>
                <Form>
                    <Field>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            name="name"
                        />
                    </Field>
                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            name="email"
                        />
                    </Field>
                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your Password"
                            name="password"
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

export default CreateAccount
