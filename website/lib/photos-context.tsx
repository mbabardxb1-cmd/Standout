'use client'

import { createContext, useContext } from 'react'

/** Option 3 switch: when true, the option 1 sections also show the client's exhibition photography. */
export const PhotosContext = createContext(false)
export const usePhotos = () => useContext(PhotosContext)
