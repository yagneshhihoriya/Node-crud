import { toaster, Message } from 'rsuite';

export const PushNotification = (message, type = "info", placement = "topEnd") => {
    const msg = (
        <Message showIcon type={type}>
            {message}
        </Message>
    )
    toaster.push(msg, { placement })
}