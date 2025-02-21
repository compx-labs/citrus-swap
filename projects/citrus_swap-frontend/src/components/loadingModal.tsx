import { jelly } from 'ldrs'
import { useContext } from 'react'
import { LoadingContext } from '../context/loading'

export const LoadingModal: React.FC = () => {
  const { loading, title } = useContext(LoadingContext)
  jelly.register()
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center " aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="relative z-50 w-full max-w-lg p-6 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 rounded-full shadow-2xl border-4 border-lime-400">
          <div className="flex  items-center justify-center px-6">
            <h2 id="modal-title" className="text-2xl font-bold text-black text-center">
              {title}
            </h2>
            <div className="flex justify-center items-center mb-4">
              <l-jelly size="100" speed="0.9" color="orange"></l-jelly>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}
