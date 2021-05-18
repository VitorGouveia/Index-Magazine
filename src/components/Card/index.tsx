import React, { FC } from "react"

type CardProps = {
  url: string
  description: string
}

const Card: FC<CardProps> = ({ url, description }) => {
  const baseURL = "https://cdn.jsdelivr.net/gh/atomicfeast/index-magazine/images/"

  const itemName = url.slice(0, -4)

  return(
    <figure>
      <img src={`${baseURL}${url}`} alt={itemName} />
      <figcaption>{description}</figcaption>
    </figure>
  )
}

export default Card