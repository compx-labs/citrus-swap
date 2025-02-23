import { useState } from 'react'
import Transact from './oraSimpleTxn'
import NotificationModal from './NotificationModal' // Import NotificationModal

const Modal = () => {
  const [openModal, setOpenModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info'>('info')

  const triggerNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
  }

  return (
    <div>
      <button className="btn" onClick={() => setOpenModal(true)}>
        Open Transaction
      </button>

      {/* Transaction Modal */}
      <Transact
        openModal={openModal}
        setModalState={setOpenModal}
        triggerNotification={triggerNotification} // Pass triggerNotification function
      />

      {/* Notification Modal */}
      <NotificationModal
        showNotification={showNotification}
        notificationMessage={notificationMessage}
        notificationType={notificationType}
        setShowNotification={setShowNotification}
      />
    </div>
  )
}

export default Modal
