import React from 'react'

export default function Notifications(props) {
        return (
                <div className="notification-container px-2 col-12 col-sm-5 col-md-4 col-lg-3">
                        {
                                props.notifications.length > 0 &&
                                props.notifications.map((notification) => {
                                        return (
                                                <div role="alert" key={notification.id} className={"d-flex justify-content-center justify-content-sm-start flex-nowrap alert alert-dismissible alert-" + notification.type}>
                                                        {notification.ico == "waiting" && 
                                                        <div className="charging-wheel-sm me-2"></div>}
                                                        {notification.message}
                                                        <button type="button" className="btn-close" onClick={() => props.deleteNotification(notification)}></button>
                                                </div>)
                                })
                        }
                </div>
        )
}
