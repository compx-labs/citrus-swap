import React from 'react'

interface NotificationModalProps {
  showNotification: boolean
  notificationMessage: string
  notificationType: 'success' | 'error' | 'info'
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  showNotification,
  notificationMessage,
  notificationType,
  setShowNotification,
}) => {
  if (!showNotification) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div
          className={`modal-box ${
            notificationType === 'success' ? 'bg-green-500' : notificationType === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          <h3 className="font-bold text-orange" >
            {notificationType === 'success' ? 'Success!' : notificationType === 'error' ? 'Error!' : 'Info'}
          </h3>
          <p className="text-orange mt-2" dangerouslySetInnerHTML={{ __html: notificationMessage }} />
          <div className="modal-action">
            <button className="btn" onClick={() => setShowNotification(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal
