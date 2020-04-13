import React, { useState } from 'react'
import { css } from '@emotion/core'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'

import firebase from '../firebase'

// Validations
import useValidation from '../hooks/useValidation'
import validateLogIn from '../validation/logIn'

const STATE_INITIAL = {
  email: '',
  password: ''
}

const Login = () => {

  const [error, setError] = useState(false)

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(STATE_INITIAL, validateLogIn, logIn)

  const { email, password } = values

  function logIn() {
    console.log('Log In...')
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
                  >Log In</h1>
                  <Form
                      onSubmit={handleSubmit}
                      noValidate
                  >
                      <Field>
                          <label htmlFor="email">Email</label>
                          <input
                              type="email"
                              id="email"
                              placeholder="Your Email"
                              name="email"
                              value={email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                          />
                      </Field>
                      {errors.email && <Error>{errors.email}</Error>}
                      <Field>
                          <label htmlFor="password">Password</label>
                          <input
                              type="password"
                              id="password"
                              placeholder="Your Password"
                              name="password"
                              value={password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                          />
                      </Field>
                      {errors.password && <Error>{errors.password}</Error>}
                      {error && <Error>{error}</Error>}
                      <InputSubmit type="submit"
                          value="Log In"
                      />
                  </Form>
              </>
          </Layout>
      </div>
  )
}

export default Login
