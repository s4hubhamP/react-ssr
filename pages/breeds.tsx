import React from 'react'
import {Request} from 'express-serve-static-core'
import {Link} from '../Link'

export const getServerSideProps = async () => {
  return fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      return {
        breeds: Object.keys(data.message),
      }
    })
}

const Breeds = ({breeds = []}) => {
  return (
    <div>
      <h1>Good Bois 🐶</h1>
      <ul>
        {breeds.map(breed => (
          <li key={breed}>
            <Link to={`/breed?b=${breed}`}>{breed}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breeds
