import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Layout from '../../components/layout/Layout'
import { FirebaseContext } from '../../firebase'
import Error404 from '../../components/layout/404'
import { Field, InputSubmit } from '../../components/ui/Form'
import Button from '../../components/ui/Button'

const ProductContainer = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
}
`

const Product = () => {

    // states
    const [product, setProduct] = useState({})
    const [error, setError] = useState(false)

    // Routing to get the actual id
    const router = useRouter()
    const { query: { id } } = router

    // Firebase context
    const { firebase, user } = useContext(FirebaseContext)

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id)
                const product = await productQuery.get()
                if (product.exists) {
                    setProduct(product.data())
                } else {
                    setError(true)
                }
            }
            getProduct()
        }
    }, [id])

    if (Object.keys(product).length === 0) return 'Loading...'

    const { comments, created, description, company, name, url, imageUrl, vote, creator } = product


    return (
        <Layout>
            <>
                {error && <Error404 />}
                <div className="container">
                    <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{name}</h1>
                    <ProductContainer>
                        <div>
                            <p>Published {formatDistanceToNow(new Date(created))} ago</p>
                            <p>By: {creator.name} of {company}</p>
                            <img src={imageUrl} />
                            <p>{description}</p>
                            {user && (
                                <>
                                    <h2>Add your comment</h2>
                                    <form>
                                        <Field>
                                            <input
                                                type="text"
                                                name="message"
                                            />
                                            <InputSubmit
                                                type="submit"
                                                value="Add Comment"
                                            />
                                        </Field>
                                    </form>
                                </>
                            )}
                            <h2 css={css`
                                margin: 2rem 0;
                            `}>Comments</h2>
                            {comments.map(comment => (
                                <li>
                                    <p>{comment.name}</p>
                                    <p>Writen by: {comment.userName}</p>
                                </li>
                            ))}
                        </div>
                        <aside>
                            <Button
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >
                                Visit URL
                            </Button>
                            <div css={css`
                                margin-top: 5rem;
                            `}>
                                {user && (
                                    <Button>
                                        Vote
                                    </Button>
                                )}
                                <p css={css`
                                text-align: center;
                            `}>{vote} Votes</p>
                            </div>
                        </aside>
                    </ProductContainer>
                </div>
            </>
        </Layout>
    );
}

export default Product