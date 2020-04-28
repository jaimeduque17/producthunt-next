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
    const [comment, setComment] = useState({})

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
    }, [id, product])

    if (Object.keys(product).length === 0) return 'Loading...'

    const { comments, created, description, company, name, url, imageUrl, vote, creator, voted } = product

    // Administrate and validate the votes
    const voteProduct = () => {
        if (!user) {
            return router.push('/login')
        }

        // Get and sum votes
        const newTotal = vote + 1

        // Verify is the actual user has voted
        if (voted.includes(user.uid)) return

        // The ID of the user that have voted is saved
        const newVoted = [...voted, user.uid]

        // Update DB
        firebase.db.collection('products').doc(id).update({ vote: newTotal, voted: newVoted })

        // Update state
        setProduct({
            ...product,
            vote: newTotal
        })
    }

    // Functions to create comments
    const commentChange = (e) => {
        setComment(({
            ...comment,
            [e.target.name]: e.target.value
        }))
    }

    const addComment = (e) => {
        e.preventDefault()
        if (!user) {
            return router.push('/login')
        }

        // Aditional information to the comment
        comment.userId = user.uid
        comment.userName = user.displayName

        //Take a copy of the comments and added to the array
        const newComments = [...comments, comment]

        // Update DB
        firebase.db.collection('products').doc(id).update({ comments: newComments })

        // Update state
        setProduct({
            ...product,
            comments: newComments
        })
    }

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
                                    <form
                                        onSubmit={addComment}
                                    >
                                        <Field>
                                            <input
                                                type="text"
                                                name="message"
                                                onChange={commentChange}
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
                            {comments.length === 0
                                ? 'There are no comments'
                                : <ul>
                                    {comments.map((comment, i) => (
                                        <li
                                            key={`${comment.userId}-${i}`}
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                        >
                                            <p>{comment.message}</p>
                                            <p>Writen by: <strong>{comment.userName}</strong>
                                            </p>
                                        </li>
                                    ))}
                                </ul>}

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
                                    <Button
                                        onClick={voteProduct}
                                    >
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