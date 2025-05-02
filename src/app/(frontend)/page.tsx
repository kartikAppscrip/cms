import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React, { useEffect } from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const data = await payload.auth({ headers })
  const { user } = await data

  const mediaResponse = await fetch('http://localhost:3000/api/media')
  const mediaData = await mediaResponse.json()


  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`



  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className='flex flex-row gap-2 border-red-100'>
        {mediaData?.docs?.map((item, index) => (
          <div key={item.id}>
            <img src={item.url} alt={item.alt} height={100} width={100} />
            <span>{item.alt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
