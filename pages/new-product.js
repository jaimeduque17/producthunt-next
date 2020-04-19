import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'
import Router, { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'

import { FirebaseContext } from '../firebase'

// Validations
import useValidation from '../hooks/useValidation'
import validateCreateProduct from '../validation/createProduct'

const STATE_INITIAL = {
  name: '',
  company: '',
  // image: '',
  url: '',
  description: ''
}

const NewProduct = () => {

  const [error, setError] = useState(false)

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(STATE_INITIAL, validateCreateProduct, createProduct)

  const { name, company, image, url, description } = values

  // Routing hook to redirect
  const router = useRouter()

  // Context with the crud operation from firebase
  const { user, firebase } = useContext(FirebaseContext)

  async function createProduct() {
    // If user doesn't have an account redirect to login
    if(!user) {
      return router.push('/login')
    }

    // Create new product object
    const product = {
      name,
      company,
      url,
      description,
      vote: 0,
      comments: [],
      created: Date.now()
    }

    // Insert in the DB
    firebase.db.collection('products').add(product)
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
          >New Product</h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend>General Information</legend>
              <Field>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}
              <Field>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.company && <Error>{errors.company}</Error>}
              {/* <Field>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  value={image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.image && <Error>{errors.image}</Error>} */}
              <Field>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  placeholder="URL of your Product"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>About your Product</legend>
              <Field>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>
            {error && <Error>{error}</Error>}
            <InputSubmit type="submit"
              value="Create Product"
            />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default NewProduct
