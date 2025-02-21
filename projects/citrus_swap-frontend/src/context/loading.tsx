import { createContext, useState } from 'react'

interface LoadingContextType {
  title: string
  setTitle: (value: string) => void
  loading: boolean
  setLoading: (value: boolean) => void
  secondaryText: string
  setSecondaryText: (value: string) => void
  displayLoadingModal: boolean
  setDisplayLoadingModal: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextType>({} as LoadingContextType)

const LoadingContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [secondaryText, setSecondaryText] = useState<string>('')
  const [displayLoadingModal, setDisplayLoadingModal] = useState<boolean>(false)

  return (
    <LoadingContext.Provider
      value={{
        title,
        setTitle,
        loading,
        setLoading,
        secondaryText,
        setSecondaryText,
        displayLoadingModal,
        setDisplayLoadingModal,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingContextProvider }
