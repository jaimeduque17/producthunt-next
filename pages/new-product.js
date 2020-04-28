import React, { useState, useContext } from 'react'
import { css } from '@emotion/core'
import Router, { useRouter } from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import Layout from '../components/layout/Layout'
import { Form, Field, InputSubmit, Error } from '../components/ui/Form'
import Error404 from '../components/layout/404'

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

  // Images state
  const [imageName, setImageName] = useState('')
  const [upload, setUpload] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState('')

  const [error, setError] = useState(false)

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(STATE_INITIAL, validateCreateProduct, createProduct)

  const { name, company, image, url, description } = values

  // Routing hook to redirect
  const router = useRouter()

  // Context with the crud operation from firebase
  const { user, firebase } = useContext(FirebaseContext)

  console.log(user)

  async function createProduct() {
    // If user doesn't have an account redirect to login
    if (!user) {
      return router.push('/login')
    }

    // Create new product object
    const product = {
      name,
      company,
      url,
      imageUrl,
      description,
      vote: 0,
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      },
      voted: []
    }

    // Insert in the DB
    firebase.db.collection('products').add(product)

    return router.push('/')
  }

  const handleUploadStart = () => {
    setUpload: true
    setProgress: 0
  }

  const handleProgress = progress => setProgress({ progress })

  const handleUploadError = error => {
    setUpload(error)
    console.error(error)
  }

  const handleUploadSuccess = name => {
    setProgress(100)
    setUpload(false)
    setImageName(name)
    firebase
      .storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        setImageUrl(url)
      })
  }

  return (
    <div>
      <Layout>
        {!user
          ? <Error404 />
          : <>
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
                <Field>
                  <label htmlFor="image">Image</label>
                  <FileUploader
                    accept="image/*"
                    id="image"
                    name="image"
                    randomizeFilename
                    storageRef={firebase.storage.ref("products")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Field>
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
        }
      </Layout>
    </div>
  )
}

export default NewProduct
