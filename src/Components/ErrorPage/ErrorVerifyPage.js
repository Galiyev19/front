import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function ErrorVerifyPage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center w-100 text-center">
        <h1 className='mt-5 text-danger'>Произошла ошибка</h1>
        <Link className="fs-5 mt-2">Вернуться на главную страницу</Link>
    </Container>
  )
}
