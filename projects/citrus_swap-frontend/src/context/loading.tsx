import { createContext, useState } from 'react'

interface LoadingContextType {
  title: string
  setTitle: (value: string) => void
  loading: boolean
  setLoading: (value: boolean) => void
  secondaryText: string
  setSecondaryText: (value: string) => void
}

const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType)

const LoadingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('Loading...')
  const [loading, setLoading] = useState<boolean>(false)
  const [secondaryText, setSecondaryText] = useState<string>('')

  return (
    <LoadingContext.Provider
      value={{
        title,
        setTitle,
        loading,
        setLoading,
        secondaryText,
        setSecondaryText,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingContextProvider }
