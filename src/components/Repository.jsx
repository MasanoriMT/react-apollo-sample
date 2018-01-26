import React from 'react'

const Repository = (props) => {
  return <li><a href={props.url}>{props.name}</a></li>
}

export default Repository
