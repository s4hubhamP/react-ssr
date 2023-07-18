import React, {useEffect} from 'react'
import {Link} from '../Link'
import {Request} from 'express-serve-static-core'

export const getServerSideProps = async ({query}: Request) => {
  return fetch(`https://dog.ceo/api/breed/${query.b}/images/random`)
    .then(response => response.json())
    .then(data => {
      return {
        breed: query.b,
        image: data.message,
      }
    })
}

const Breed = ({breed = '', image = ''}) => {
  return (
    <div>
      <Link to='/breeds'>Go Back</Link>
      <h1>{breed}</h1>
      <img src={image} alt={breed} />
    </div>
  )
}

export default Breed
